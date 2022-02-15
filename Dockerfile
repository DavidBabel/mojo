FROM node:16.13-buster-slim AS build
RUN apt-get update && apt-get install libssl-dev ca-certificates -y
WORKDIR /app
RUN export NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile || true

COPY . .
RUN yarn setup
RUN yarn build

RUN cp -R node_modules prisma_node_modules
RUN npm prune --production || true

RUN rm -rf node_modules/@generated
RUN cp -R prisma_node_modules/@generated node_modules
RUN cp -R node_modules prod_node_modules

FROM build as deploy

COPY --from=build /app/prod_node_modules /app/node_modules
COPY --from=build /app/.env /app/.env
COPY --from=build /app/.next /app/.next
COPY --from=build /app/dist /app/dist
COPY --from=build /app/public /app/public

EXPOSE 8080
CMD ["yarn", "start"]
