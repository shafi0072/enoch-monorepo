import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media, MediaDocument } from 'src/db/schemas/media.schema';
import DBService from './db.service';
import { SignedUrl } from 'src/graphql/models/signedUrl.model';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { generate } from 'short-uuid';
import SubscriptionService from './subscription.service';

@Injectable()
export default class FileUploadService extends DBService {
  prefix = 'media';
  idField = 'mediaId';

  constructor(
    @InjectModel(Media.name) private readonly mediaModel: Model<MediaDocument>,
    private readonly configService: ConfigService,
    private readonly subscriptionService: SubscriptionService,
  ) {
    super(mediaModel);
  }

  client = new S3Client({
    // endpoint: this.configService.get('DO_SPACES_ENDPOINT'),
    region: this.configService.get('AWS_DEFAULT_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
  });

  bucketParams = {
    Bucket: this.configService.get('AWS_BUCKET'),
    Key: `media_${generate()}`,
  };

  // Generates the URL.
  async getSignedUrl(): Promise<SignedUrl> {
    try {
      const command = new GetObjectCommand(this.bucketParams);
      const url = await getSignedUrl(this.client, command, {
        expiresIn: 15 * 60,
      });
      return { url };
    } catch (err) {
      throw new Error(err);
    }
  }

  // Generates the URL For Download.
  async getSignedDownloadUrl(userId, mediaId): Promise<SignedUrl> {
    const query = { userId, mediaId };
    const userSubscription =
      await this.subscriptionService.findSubscriptionById(query);
    if (!userSubscription) {
      throw new Error('Please purchase subscription to view this content');
    }
    try {
      const command = new GetObjectCommand(this.bucketParams);
      const url = await getSignedUrl(this.client, command, {
        expiresIn: 24 * 60 * 60,
      });
      return { url };
    } catch (err) {
      throw new Error(err);
    }
  }
}
