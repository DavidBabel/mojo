#!/bin/bash

    "heroku-postbuild": "bash ./tools/scripts/heroku-post-build.sh"

export NPM_CONFIG_PRODUCTION=true
export NODE_ENV=production

cp -R node_modules/@generated @generated
npm prune --production
rm -rf node_modules/@generated
cp -R @generated node_modules
