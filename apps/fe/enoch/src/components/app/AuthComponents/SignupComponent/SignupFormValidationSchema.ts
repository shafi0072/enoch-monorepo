import * as yup from "yup";
import { regExpression } from "../../../../constants/regEx";
import { messages } from "../../../../locals/en-US";

export const signupValidationSchema = yup.object().shape({
  firstName: yup.string().required(messages.firstName),
  lastName: yup.string().required(messages.lastName),
  email: yup
    .string()
    .email(messages.emailRequired)
    .required(messages.emailRequired)
    .matches(
      regExpression.emailRegex.mailFormat,
      messages.emailStandard.mailFormat
    ),
  countryCode: yup.string().required(messages.countryCode),
  phoneNumber: yup
    .string()
    .required(messages.phoneRequired)
    .matches(regExpression.phoneRegex, messages.phoneError),
  isAgreedToTerms: yup.bool().oneOf([true], messages.acceptTerms).required(),
  subscribedToEnochMails: yup.bool().required(),
  authMode: yup.string().required().typeError(messages.authModeRequired),
  passkey: yup.string().required(),
  password: yup
    .string()
    .required(messages.passwordRequired)
    .min(8, messages.shortPassword)
    .max(15, messages.longPassword)
    .matches(
      regExpression.passwordRegex.lowercase,
      messages.passwordStandard.lowercase
    )
    .matches(
      regExpression.passwordRegex.uppercase,
      messages.passwordStandard.uppercase
    )
    .matches(
      regExpression.passwordRegex.specialChar,
      messages.passwordStandard.specialChar
    )
    .matches(
      regExpression.passwordRegex.number,
      messages.passwordStandard.number
    ),

  repeatPassword: yup
    .string()
    .required(messages.requiredConfirmPassword)
    .oneOf([yup.ref("password"), null], messages.confirmPassword),
});
