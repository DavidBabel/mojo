FROM node:16.13-buster-slim
RUN apt-get update && apt-get install libssl-dev ca-certificates -y
WORKDIR /app
RUN export NODE_ENV=production

COPY package.json yarn.lock ./
RUN SKIP_POSTINSTALL=1 yarn install --frozen-lockfile && yarn cache clean

COPY . .
RUN yarn setup
RUN yarn build

RUN yarn remove ts-jest prisma nodemon jest eslint eslint-config-next \
  @graphql-codegen/cli @graphql-codegen/introspection @graphql-codegen/typescript \
  @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo \
  @faker-js/faker

EXPOSE 8080
CMD ["yarn", "start"]
