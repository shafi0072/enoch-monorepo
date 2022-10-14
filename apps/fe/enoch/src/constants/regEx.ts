export const regExpression = {
  passwordRegex: {
    uppercase: /[A-Z]+/,
    lowercase: /[a-z]+/,
    number: /\d+/,
    specialChar: /[@$!%*#?&]+/
  },
  phoneRegex: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  emailRegex: {
    mailFormat: /[a-zA-Z]{2,4}$/
  }
};
