import { registerEnumType } from '@nestjs/graphql';

export enum PollOptionsEnum {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

export enum PollDuration {
  ONE_DAY = '1 Day',
  THREE_DAYS = '3 Days',
  ONE_WEEK = '1 Week',
  TWO_WEEKS = '2 Weeks',
}

registerEnumType(PollDuration, {
  name: 'PollDuration',
});

registerEnumType(PollOptionsEnum, {
  name: 'PollOptionsEnum',
});
