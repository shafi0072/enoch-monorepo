import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectS3, S3 } from 'nestjs-s3';
import { Model } from 'mongoose';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import {
  S3Uploads,
  S3UploadsDocument,
} from 'src/db/schemas/s3-schema/S3Uploads';
import { ERROR_MESSAGES, CONSTANT_VARIABLE } from '../constant.json';

const basePath = 'UploadedFiles/';
@Injectable()
export class s3UploadService {
  constructor(
    @InjectModel('S3Uploads') private S3UploadsModel: Model<S3UploadsDocument>,
    private readonly configService: ConfigService,
    @InjectS3() private readonly s3: S3,
  ) {}

  getFileKey(filename) {
    return `${basePath}${uuidv4()}${filename}`;
  }

  async uploadFileGraphql(fileUploaded): Promise<String> {
    let uploadingToS3;

    const { createReadStream, filename } = await fileUploaded;
    const fileExtentionType = path.extname(filename);
    const documentname = path.basename(filename, fileExtentionType);

    const filepath = `UploadedFiles` + '/' + uuidv4() + filename;
    const bucketName = this.configService.get('AWS_BUCKET');
    const params = {
      Bucket: bucketName,
      Key: filepath,
      Body: createReadStream(),
    };

    try {
      uploadingToS3 = new Promise((resolve, reject) => {
        this.s3.upload(params, function(err, data) {
          if (err) {
            reject(err);
          }
          return resolve(data);
        });
      });
    } catch (error) {
      throw new Error(ERROR_MESSAGES.ERROR_FILE_UPLOAD);
    }
    const response = await uploadingToS3;

    try {
      if (response.Location) {
        this.S3UploadsModel.create({ fileUrl: response.Location });
      }
    } catch (error) {
      throw new Error(ERROR_MESSAGES.ERROR_INSERTING_TO_DB);
    }
    return response;
  }

  async uploadFileRestApi(fileUploaded): Promise<String> {
    const bucketName = this.configService.get('AWS_BUCKET');
    let uploadingToS3;
    const { buffer, originalname, ...rest } = await fileUploaded;
    console.log('originalname,rest', originalname, rest);
    const filepath = `UploadedFiles` + '/' + uuidv4() + originalname;
    const params = {
      Bucket: bucketName,
      Key: filepath,
      Body: buffer,
      ACL: 'public-read',
    };

    try {
      uploadingToS3 = new Promise((resolve, reject) => {
        this.s3.upload(params, function(err, data) {
          if (err) {
            reject(err);
          }
          console.log('data', data);
          return resolve(data);
        });
      });
    } catch (error) {
      throw new Error(ERROR_MESSAGES.ERROR_FILE_UPLOAD);
    }
    const response = await uploadingToS3;

    try {
      if (response.Location) {
        this.S3UploadsModel.create({ fileUrl: response.Location });
      }
    } catch (error) {
      throw new Error(ERROR_MESSAGES.ERROR_INSERTING_TO_DB);
    }
    return response;
  }

  async multiFileUploadRestApi(files): Promise<String[] | any> {
    const perFileUpload = async fileUploaded => {
      let uploadingToS3;
      const { buffer, originalname } = await fileUploaded;
      const filepath = `UploadedFiles` + '/' + uuidv4() + originalname;
      const params = {
        Bucket: CONSTANT_VARIABLE.AWS_BUCKET,
        Key: filepath,
        Body: buffer,
      };
      try {
        uploadingToS3 = new Promise((resolve, reject) => {
          this.s3.upload(params, function(err, data) {
            if (err) {
              reject(err);
            }
            return resolve(data.Location);
          });
        });
      } catch (error) {
        throw new Error(ERROR_MESSAGES.ERROR_FILE_UPLOAD);
      }
      const fileUrl = await uploadingToS3;
      return fileUrl;
    };

    const perFileUploadpromises = files.map(async file => {
      return await perFileUpload(file);
    });
    const allFileUpload = await Promise.all(perFileUploadpromises);
    try {
      this.S3UploadsModel.create({ filesUrl: allFileUpload });
    } catch (error) {
      throw new Error(ERROR_MESSAGES.ERROR_INSERTING_TO_DB);
    }
    return allFileUpload;
  }

  async createPreSignedURL(filename: string) {
    this.s3.config.update({ signatureVersion: 'v4' });
    const params = {
      Bucket: this.configService.get('AWS_BUCKET'),
      Key: filename,
    };
    return await this.s3.getSignedUrl('putObject', params);
  }

  async list() {
    const list = await this.s3.listObjectsV2({
      Bucket: this.configService.get('AWS_BUCKET'),
    }).promise();
    return list;
  }
}
