#!/bin/bash

set -e

. ./tools/scripts/utils/echo-utils.sh
. ./tools/scripts/utils/prerequesite.sh

echo -e "${info} install dependencies"
mkdir node_modules 2>/dev/null || true
touch ./node_modules/.metadata_never_index
SKIP_POSTINSTALL=1 yarn install

touch .env.local
source ./.env
source ./.env.local

echo -e "${info} current DB : ${PRISMA_DATABASE_URL}"
echo -e "${info} deleting previous DB"
rm src/server/${PRISMA_DATABASE_URL/file:./prisma} 2>/dev/null || true

echo -e "${info} generating prisma client"
prisma generate

echo -e "${info} pushing db model"
prisma db push

echo -e "${info} seeding db model"
prisma db seed

echo -e "${info} generating the GraphQl Schema"
yarn script src/server/graphql/buildSchema.ts

echo -e "${info} Generating GraphQL types from GraphQl Schema"
graphql-codegen --config ./tools/graphql-gen-types-config.yml

echo -e "${info} disabling nextjs telemetry"
next telemetry disable

bash ./tools/scripts/utils/mute-react-dom.sh

echo -e "${success} you are all set"

