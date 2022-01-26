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

echo -e "${info} current DB : ${DATABASE_URL}"
echo -e "${info} deleting previous DB"
rm src/server/${DATABASE_URL/file:./prisma} 2>/dev/null  | true

echo -e "${info} generating prisma client"
prisma generate

echo -e "${info} pushing db model"
prisma db push

echo -e "${info} seeding db model"
prisma db seed

echo -e "${info} disabling nextjs telemetry"
next telemetry disable

echo -e "${success} you are all set"

