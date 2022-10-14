import { faker } from '@faker-js/faker';

export default Array(50)
  .fill({ firstName: 'fake' })
  .map((obj) => ({
    ...obj,
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber(),
    username: faker.name.middleName(),
    bio: faker.lorem.sentences(),
    country: faker.address.county(),
  }));
