import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DBService from './db.service';
import { PollVote, PollVoteDocument } from '../db/schemas/pollVotes';

@Injectable()
export default class PollVotesService extends DBService {
  prefix = 'plv';
  idField: string = 'pollVoteId';
  constructor(
    @InjectModel(PollVote.name)
    private readonly pollVoteModel: Model<PollVoteDocument>,
  ) {
    super(pollVoteModel);
  }
}
