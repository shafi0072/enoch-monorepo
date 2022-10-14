import RestApiClient from "./RestApiClient";

const AUTH_SERVICE_URL =
  process.env.NEXT_PUBLIC_AUTH_SERVICE_URL_RESOURCE ||
  "http://localhost:3001/auth";

export enum Resource {
  User = "User",
  Industry = "Industry",
  Feature = "Feature",
}
class ResouceCrudClient extends RestApiClient {
  baseURL = AUTH_SERVICE_URL;
  constructor() {
    super();
  }

  async list(resourceName: Resource) {
    return this.axios.get(`/model/${resourceName}`);
  }

  async create(resourceName: Resource, body: any) {
    return this.axios.post(`/model/${resourceName}`, body);
  }

  async get(resourceName: Resource, id: string) {
    return this.axios.get(`/model/${resourceName}/${id}`);
  }

  async update(resourceName: Resource, id: string, body: any) {
    return this.axios.put(`/model/${resourceName}/${id}`, body);
  }

  async delete(resourceName: Resource, id: string) {
    return this.axios.delete(`/model/${resourceName}/${id}`);
  }

  async find(resourceName: Resource, body: any) {
    return this.axios.post(`/model/${resourceName}/find`, body);
  }
}

export default new ResouceCrudClient();
