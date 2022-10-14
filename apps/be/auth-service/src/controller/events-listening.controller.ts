import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import AllowedUserService from 'src/services/allowedUsers.service';
import UserService from 'src/services/user.service';
import { EventRecieveSubjects } from 'src/shared/enums/event-recieve-subject';

@Controller()
export class EventListener {
  constructor(
    private readonly allowedUserService: AllowedUserService,
    private userService: UserService,
  ) {}
  @EventPattern(EventRecieveSubjects.CREATE_ALLOWED_USER)
  async userCreated({ value: data }: any): Promise<void> {
    await this.allowedUserService.createAllowedUser(
      data.email,
      data.hashedPassword,
      true,
    );
  }

  @EventPattern(EventRecieveSubjects.SAVE_OTP)
  async saveotp({ value: data }: any): Promise<void> {
    await this.userService.updateOtpSentStatus(data.userId, data.smsStatus);
  }
}
