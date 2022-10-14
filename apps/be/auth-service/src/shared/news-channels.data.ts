import { generateMongooseId } from 'src/utils';

export const newsChannels = [
  {
    _id: generateMongooseId('2292A04BDB348A23DE70F079'),
    channelId: 'nc-111',
    channelName: 'Social commerce',
    channelDescription:
      'The power of customer reviews was borne of the social commerce revolution.',
  },
  {
    _id: generateMongooseId('AA2FB58A83BC8047B63AEE5C'),
    channelId: 'nc-222',
    channelName: 'Livestreaming',
    channelDescription:
      'Connect with your viewers in real time. launch a product,  deliver an interactive class, a fashion or music show to generate income.',
  },
  {
    _id: generateMongooseId('BFC9571871AF19AE6515EF59'),
    channelId: 'nc-333',
    channelName: 'Enoch Marketplace',
    channelDescription:
      'Discover, buy and sell crypto collectibles and assets nonfungible tokens (NFTs) or create your own.',
  },
];
