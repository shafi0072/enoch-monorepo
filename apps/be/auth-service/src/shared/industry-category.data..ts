import { generateMongooseId } from 'src/utils';

export const industries = [
  {
    _id: generateMongooseId('B5B5A1167819C163989ECC8C'),
    industryId: 'in-111',
    industryCategory: 'Arts & Crafts',
    isVerified: true,
  },
  {
    _id: generateMongooseId('D497FB04FAAD2C1F0ECB4DB1'),
    industryCategory: 'Video Gaming',
    industryId: 'in-222',
    isVerified: true,
  },
  {
    _id: generateMongooseId('B684DBB08A1DCB2DF14D417C'),
    industryCategory: 'Gambling/Sports Betting',
    isVerified: true,
    industryId: 'in-333',
  },
  {
    _id: generateMongooseId('625672ecb035de718c63b348'),
    industryCategory: 'Fashion',
    isVerified: true,
    industryId: 'in-444',
  },
  {
    _id: generateMongooseId('6256793cd5011d18fc2aea96'),
    industryCategory: 'Crypto / DeFi',
    isVerified: true,
    industryId: 'in-555',
  },
  {
    _id: generateMongooseId('625679937635620c3a65d296'),
    industryCategory: 'None Fungible Token(NFT)',
    isVerified: true,
    industryId: 'in-666',
  },
  {
    _id: generateMongooseId('62567c56f98e7a8a9b7cbda7'),
    industryCategory: 'Music',
    isVerified: true,
    industryId: 'in-777',
  },
  {
    _id: generateMongooseId('62567c40f98e7a8a9b7cbda5'),
    industryCategory: 'Entertainment & Media ',
    isVerified: true,
    industryId: 'in-888',
  },
];
