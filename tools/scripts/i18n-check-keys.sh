#!/bin/bash

. ./tools/scripts/utils/echo-utils.sh
. ./tools/scripts/utils/prerequesite.sh

translationsPaths=./src/front/i18n/translations;

echo -e "${info} Sorting translation files keys"
for file in ${translationsPaths}/*.json
do
  jsonsort $file
done

echo -e "${info} Comparing translation files for missing keys"
for file in ${translationsPaths}/*.json
do
  echo "compare to $file"
  json-diff --keys-only ${translationsPaths}/en.json $file
done

