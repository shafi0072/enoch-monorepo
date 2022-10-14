import * as yup from "yup";
import { regExpression } from "../../../../constants/regEx";
import { messages } from "../../../../locals/en-US";

export const signInValidationSchema = yup.object().shape({
  email: yup.string().required("Email/Phone Number is required"),
  // .test('test-name', 'Enter Valid Phone/Email',
  //   function (value: any) {
  //     const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  //     const phoneRegex = /^(\+91-|\+91|0)?\d{10}$/; // Change this regex based on requirement
  //     let isValidEmail = emailRegex.test(value);
  //     let isValidPhone = phoneRegex.test(value);
  //     if (!isValidEmail && !isValidPhone) {
  //       return false;
  //     }
  //     return true;
  //   }),
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
      regExpression.passwordRegex.number,
      messages.passwordStandard.number
    )
    .matches(
      regExpression.passwordRegex.specialChar,
      messages.passwordStandard.specialChar
    ),

  authMode: yup
    .string()
    .required()
    .typeError(messages.authModeRequired),
  passkey: yup.string().required(messages.passkeyRequired)
});
