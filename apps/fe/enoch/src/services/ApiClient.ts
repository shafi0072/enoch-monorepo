class ApiClient {
  client;
  constructor(client: any) {
    this.client = client;
  }

  async query(query: any, options: any = {}) {
    return await this.client.query({ query, ...options });
  }

  async mutation(query: any, obj: any) {
    return await this.client.mutate({
      mutation: query,
      variables: obj,
    });
  }
  async refetch(query: any) {
    return await this.client.refetchQueries({
      include: [{ query }],
    });
  }
}
export default ApiClient;
