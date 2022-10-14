import { registerEnumType } from "@nestjs/graphql";

export enum EventEmittingSubjects {
  SAVE_OTP_EVENT = "save-otp",
}

registerEnumType(EventEmittingSubjects, {
  name: "EventEmittingSubjects",
});
