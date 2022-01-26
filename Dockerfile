# https://www.codemochi.com/blog/2022-01-01-dockerizing-nextjs-with-prisma-for-production

FROM node:16.13-buster-slim AS base
RUN apt-get update && apt-get install libssl-dev ca-certificates -y
WORKDIR /app

COPY package.json yarn.lock ./

FROM base as build
RUN export NODE_ENV=production
RUN yarn

COPY . .
# to add
# RUN yarn run prisma:generate
RUN yarn build

FROM base as prod-build

RUN yarn install --production --frozen-lockfile
# COPY prisma prisma
# RUN yarn run prisma:generate
RUN cp -R node_modules prod_node_modules

FROM base as prod

COPY --from=prod-build /app/prod_node_modules /app/node_modules
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
# COPY --from=build /app/prisma /app/prisma

EXPOSE 80
CMD ["yarn", "start"]
