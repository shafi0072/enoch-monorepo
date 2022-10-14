import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import moment from 'moment';

import { Post, PostDocument, PostSchema } from 'src/db/schemas/post.schema';
import { CommonErrors } from 'src/shared/enums/common-erros';
import { PollDuration } from 'src/shared/enums/poll-enums';
import DBService from './db.service';
import PollVotesService from './poll-votes.service';

@Injectable()
export default class PollPostService extends DBService {
  prefix = 'poll';
  idField: string = 'pollPostId';
  constructor(
    @InjectModel(Post.name)
    private readonly pollPostModel: Model<PostDocument>,
    private readonly pollVoteService: PollVotesService,
  ) {
    super(pollPostModel);
  }

  async addCount(poll: any, option, currentCount) {
    return { ...poll, [option]: currentCount + 1 };
  }

  async gettotalVote(updatedPoll: any) {
    return (
      +updatedPoll.optionACount +
      +updatedPoll.optionBCount +
      +updatedPoll.optionCCount +
      +updatedPoll.optionDCount
    );
  }

  async updatePercentege(updatedPoll: any, totalVote: number) {
    const optionAPercent = (+updatedPoll.optionACount * 100) / totalVote;
    const optionBPercent = (+updatedPoll.optionBCount * 100) / totalVote;
    const optionCPercent = (+updatedPoll.optionCCount * 100) / totalVote;
    const optionDPercent = (+updatedPoll.optionDCount * 100) / totalVote;
    return {
      optionAPercent: Math.round(optionAPercent),
      optionBPercent: Math.round(optionBPercent),
      optionCPercent: Math.round(optionCPercent),
      optionDPercent: Math.round(optionDPercent),
    };
  }

  async isAlreadyVoted(postId: string, user: any) {
    const isAlreadyVoted = await this.pollVoteService.findOne({
      post: postId,
      user: user._id,
    });
    if (isAlreadyVoted) {
      throw new BadRequestException(CommonErrors.AlreadyVoted);
    }
  }

  async checkIfOptionExist(poll: any, selectedOption: string) {
    const option = poll[`option${selectedOption}`];
    if (!option) {
      throw new BadRequestException(CommonErrors.OptionSelectedDoesNotExist);
    }
  }

  async getExpiryofPoll(duration) {
    return duration === PollDuration.ONE_DAY
      ? moment().add(1, 'd')
      : duration === PollDuration.ONE_WEEK
      ? moment().add(1, 'w')
      : duration === PollDuration.THREE_DAYS
      ? moment().add(3, 'd')
      : moment().add(2, 'w');
  }

  async addVote(user, selectedOption, postId) {
    const poll = await this.findOne({ _id: postId });
    if (!poll) {
      throw new BadRequestException(CommonErrors.PollDoesNotExist);
    }
    if (!moment().isBefore(poll.duration)) {
      throw new BadRequestException(CommonErrors.PollDoesNotExist);
    }
    await this.isAlreadyVoted(postId, user);
    await this.checkIfOptionExist(poll, selectedOption);
    const option = `option${selectedOption}Count`;
    const currentCount = poll[option];
    const updatedCountPoll = await this.addCount(
      poll.toJSON(),
      option,
      currentCount,
    );
    const totalVote = await this.gettotalVote(updatedCountPoll);
    const {
      optionAPercent,
      optionBPercent,
      optionCPercent,
      optionDPercent,
    } = await this.updatePercentege(updatedCountPoll, totalVote);
    const finalPollData = await this.update(poll, {
      [option]: currentCount + 1,
      optionAPercent,
      optionBPercent,
      optionCPercent,
      optionDPercent,
    });
    if (!finalPollData) {
      throw new InternalServerErrorException(CommonErrors.SomethingWentWrong);
    }
    await this.pollVoteService.create({
      user: user._id,
      post: postId,
      userSelectedOption: selectedOption,
      voteStatus: true,
    });
    return finalPollData;
  }
}
