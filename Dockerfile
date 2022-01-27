# https://www.codemochi.com/blog/2022-01-01-dockerizing-nextjs-with-prisma-for-production

FROM node:16.13-buster-slim
RUN apt-get update && apt-get install libssl-dev ca-certificates -y
WORKDIR /app

COPY package.json yarn.lock ./

RUN export NODE_ENV=production
# RUN export DATABASE_URL="file:./db/sqlite.db"
COPY . .

RUN yarn setup
RUN yarn build


EXPOSE 80
CMD ["yarn", "start"]
