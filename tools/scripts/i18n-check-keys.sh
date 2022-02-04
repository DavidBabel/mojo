#!/bin/bash

. ./tools/scripts/utils/prerequesite.sh

translationsPaths=./src/front/i18n/translations;

for file in ${translationsPaths}/*.json
do
  echo "compare to $file"
  json-diff --keys-only ${translationsPaths}/en.json $file
done
