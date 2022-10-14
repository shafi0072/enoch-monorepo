import * as yup from "yup";

export const MediaUploadValidationSchema = yup.object().shape({
  title: yup.string().required(),
  category: yup.string().required(),
  privacy: yup.string().required(),
  terms_and_conditions: yup.bool().oneOf([true]),
});
