class FormApiError extends Error {
    errors: any;
    constructor(formErrors: any) {
      super();
      this.errors = formErrors;
    }
  }
  
  export default FormApiError;
  