import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

import { CONFIG } from "~/iso/config";
import { isProd } from "~/iso/env";

const uri = isProd()
  ? CONFIG.GRAPHQL_ENDPOINT
  : "http://localhost:3000" + CONFIG.GRAPHQL_ENDPOINT;

const link = createUploadLink({ uri });

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export { apolloClient };
