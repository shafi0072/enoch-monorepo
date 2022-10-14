import { registerEnumType } from "@nestjs/graphql";

export enum EventListeningSubjects {
  SEND_MESSAGE = "sms-send-sendMessage",
  SEND_OTP = "sms-send-sendOtp",
  VERIFY_OTP = "sms-verify-verifyOtp",
}

registerEnumType(EventListeningSubjects, {
  name: "EventListeningSubjects",
});
