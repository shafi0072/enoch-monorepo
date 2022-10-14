import { Controller, Post, Get, Body, Req, UseGuards, Param, Put } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection,Types} from 'mongoose';


@Controller('crud')
export class CrudController {
  constructor(@InjectConnection() private connection: Connection,
  ) {}

  @Get('get-models')
  async getModels() {
    return this.connection.modelNames();
  }

  @Get('model/:modelName')
  async getModelData(@Param('modelName') modelName) {
    const model = this.connection.model(modelName) as any;
    return  model.find();
  }

  @Get('model/:modelName/:modelId')
  async findModelData(
    @Param('modelName') modelName,
    @Param('modelId') modelId,
    @Body() body
  ) {
    const model = this.connection.model(modelName) as any;
    return model.findById(modelId);
  }
  
  @Post('model/:modelName/find')
  async findModel(@Param('modelName') modelName, @Body() body) {
    const model = this.connection.model(modelName) as any;
    return model.find(body);
  }

  @Post('model/:modelName')
  async createModelData(@Param('modelName') modelName, @Body() body) {
    const model = this.connection.model(modelName) as any;
    return model.create({_id :new Types.ObjectId(),...body});
  
  }

  @Put('model/:modelName/:modelId')
  async updateModelData(
    @Param('modelName') modelName,
    @Param('modelId') modelId,
    @Body() body
  ) {
    const model = this.connection.model(modelName) as any;
    return model.findByIdAndUpdate(modelId, body, {returnDocument: "after"})
  }

  @Put('model/:modelName/:modelId')
  async deleteModelData(
    @Param('modelName') modelName,
    @Param('modelId') modelId,
    @Body() body
  ) {
    const model = this.connection.model(modelName) as any;
    return model.findByIdAndDelete(modelId, body, {returnDocument: "after"})
  }
  

  @Get('user/:username')
  async getUsers(@Param('username') username) {
    const model = this.connection.model(username) as any;
    return  model.find();
  }
}
