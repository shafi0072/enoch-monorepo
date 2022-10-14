import { generate } from 'generate-password';
import { ConfigService } from '@nestjs/config';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import otpGenerator from 'otp-generator';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { CreateAllowedUserInput } from '../dto/allowed-user.input';
import AllowedUserService from 'src/services/allowedUsers.service';
import { AllowerUserModel } from '../models/allowedUser.model';
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGE,
  CONSTANT_VARIABLE,
} from '../../constant.json';
import { SendPasskeyEvent } from 'src/shared/interfaces/event-emit-interfaces';
import { EventEmitSubjects } from 'src/shared/enums/event-emit-subjects';

@Resolver(() => AllowerUserModel)
export class GeneratePasskeyResolver {
  constructor(
    private allowedUserService: AllowedUserService,
    private readonly configService: ConfigService,
    @Inject('KAFKA_SERVICE') private natsServerClient: ClientKafka,
  ) {}

  @Mutation(() => String || Error)
  async generatePasskey(
    @Args('CreateAllowedUserData')
    CreateAllowedUserData: CreateAllowedUserInput,
  ): Promise<string> {
    const { email, secretToken } = CreateAllowedUserData;
    if (secretToken !== this.configService.get('GENERATE_PASSKEY_SECRET')) {
      throw new Error(ERROR_MESSAGES.INVALID_GENERATE_PASSKEY_SECRET);
    }
    let hashedPassword = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    hashedPassword = CONSTANT_VARIABLE.PASSKEY.concat(hashedPassword);
    try {
      const payload: SendPasskeyEvent = {
        to: email,
        passkey: hashedPassword,
      };
      await this.allowedUserService.createAllowedUser(
        email,
        hashedPassword,
        false,
      );
      this.natsServerClient.emit<string>(
        EventEmitSubjects.EMAIL_SEND_PASSKEY,
        payload,
      );
      return SUCCESS_MESSAGE.EMAIL_SENT_SUCCESS;
    } catch (err) {
      throw new Error(err);
    }
  }

  @Query(() => String)
  async getPasskey(
    @Args('email') email: string,
    @Args('secretToken') secretToken: string,
  ) {
    if (this.configService.get('NODE_ENV') === 'production') {
      throw new Error(ERROR_MESSAGES.PASSKEY_VISIBILITY);
    }
    if (secretToken != this.configService.get('GENERATE_PASSKEY_SECRET')) {
      throw new Error(ERROR_MESSAGES.INVALID_GENERATE_PASSKEY_SECRET);
    }
    const passkey = await this.allowedUserService.getPasskeyByEmail(email);

    if (!passkey) {
      throw new Error(ERROR_MESSAGES.ALLOWED_USER_NOT_FOUND);
    }
    return passkey.hashedPassKey;
  }
}
