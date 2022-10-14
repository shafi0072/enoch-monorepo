import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { localStorageVariables } from "../constants/localStorageVariables";
import ApiClient from "./ApiClient";
const AUTH_SERVICE_URL =
  process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || "http://localhost:3001";

const httpLink = createHttpLink({
  uri: `${AUTH_SERVICE_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(localStorageVariables.ACCESS_TOKEN);

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

class AuthClient extends ApiClient {
  constructor() {
    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
    super(client);
  }
}

class ServerSideClient extends ApiClient {
  constructor() {
    const client = new ApolloClient({
      uri: `${AUTH_SERVICE_URL}/graphql`,
      cache: new InMemoryCache(),
    });
    super(client);
  }
}

export const serverSideClient = new ServerSideClient();

export default new AuthClient();
