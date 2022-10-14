import { Controller, Inject } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { UserDocument, User } from 'src/db/schemas/user.schema';
import UserService from 'src/services/user.service';
import { EventRecieveSubjects } from 'src/shared/enums/event-receive-subject';
import { IncomingMessage } from 'src/shared/interfaces/incoming-message-interface';

@Controller()
export class EventListener {
  constructor(private userService: UserService) {}

  @EventPattern(EventRecieveSubjects.CREATE_USER)
  async userCreated({ value }: IncomingMessage<User>) {
    return await this.userService.createUser({
      username: value.username,
      firstName: value.firstName,
      lastName: value.lastName,
      _id: value._id,
      email: value.email,
      avatar: value.avatar,
      avatarTitle: value.avatarTitle,
      avatarCard: value.avatarCard,
      accountType: value.accountType,
      bio: value.bio,
      backgroundImage: value.backgroundImage,
      isOnboardingCompleted: value.isOnboardingCompleted,
    });
  }
}
