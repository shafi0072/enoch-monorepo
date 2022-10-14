import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { Avatar } from '../models/avatar.model';
import AvatarService from 'src/services/avatar.service';
import { CreateAvatarInput } from '../dto/create-avatar.input';

@Resolver(() => Avatar)
export class AvatarResolver {
  constructor(private service: AvatarService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Avatar)
  async createAvatar(
    @CurrentUser() user,
    @Args('avatar') body: CreateAvatarInput,
  ) {
    return await this.service.create(body);
  }

  @Query(() => [Avatar])
  async getAllAvatars() {
    return await this.service.find();
  }
}
