const axios = require("axios").default;
const AUTH_SERVICE_URL =
  process.env.NEXT_PUBLIC_AUTH_SERVICE_URL_RESOURCE ||
  "http://localhost:3001/auth";

class RestApiClient {
  baseURL = `${AUTH_SERVICE_URL}/crud`;
  axios: any;
  constructor() {
    this.axios = axios.create({
      baseURL: this.baseURL,
      timeout: 1000,
      headers: {
        "X-Custom-Header": "foobar",
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
  }
}

export default RestApiClient;
