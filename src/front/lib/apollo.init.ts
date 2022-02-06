import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

import { CONFIG } from "~/iso/config";
import { getCors } from "~/iso/cors";
import { isProd } from "~/iso/env";

const uri = isProd()
  ? CONFIG.GRAPHQL_ENDPOINT
  : "http://localhost:3000" + CONFIG.GRAPHQL_ENDPOINT;

const link = createUploadLink({
  credentials: getCors("apolloClientCredentials"),
  uri,
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export { apolloClient };
