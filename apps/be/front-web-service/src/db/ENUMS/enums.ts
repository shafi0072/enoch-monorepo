import { registerEnumType } from '@nestjs/graphql';

export enum CategoryContact {
    CREATORS = 'CREATORS',
    ARTISTS = 'ARTISTS',
    INVESTORS = 'INVESTORS',
    PARTNERS = 'PARTNERS',
}

registerEnumType(CategoryContact, {
  name: 'CategoryContact',
});
