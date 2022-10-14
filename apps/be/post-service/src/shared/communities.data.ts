import { generateMongooseId } from 'src/utils';

export const communities = [
  {
    _id: generateMongooseId('BF5FE0D331AE709561B4B73C'),
    communityId: 'ci-1111',
    communityName: 'The Weather Channel',
    communityDescription:
      "The World's Leading Weather Provider. Home to The Weather Channel TV network, apps, and http://weather.com. Follow for forecasts, news, and alerts.",
    followersCount: '3.9M',
  },
  {
    _id: generateMongooseId('9DD769447D2E00F3917E7883'),
    communityId: 'ci-222',
    communityName: 'NaNoWriMo',
    communityDescription:
      'Your story matters. Pen a novel with NaNoWriMo, Camp NaNoWriMo, the Young Writers Program, and our writing community! Here for your questions M-F 8-4 PT.',
    followersCount: '208.9K',
  },
];
