import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { tagsFromText } from 'src/utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class PostElasticSearchService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  async index(post) {
    console.log('Indexing Post data');
    const postData = {
      id: post._id,
      who_can_see: post.whoCanSee,
      type: post.type,
      caption: post.caption,
      title: post.title,
      tags: [...tagsFromText(post.title), ...tagsFromText(post.caption)],
      created_at: post.createdAt,
      updated_at: post.updatedAt,
    };
    // Need to remove hardcoding
    this.httpService
      .post(this.configService.get('ELASTIC_SEARCH_URL'), postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.configService.get(
            'ELASTIC_SEARCH_BEARER_TOKEN',
          )}`,
        },
      })
      .toPromise()
      .then(({ data }) => console.log(JSON.stringify(data)))
      .catch((e) => console.log(e));
  }
}
