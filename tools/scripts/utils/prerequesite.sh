#!/bin/bash

set -e

. ./tools/scripts/utils/echo-utils.sh

echo -e "${info} Checking script prerequisites"

if [ ! -f "package.json" ]; then
  echo -e "${error} Has to be run from project root, certainly with a yarn command"
  exit 1
fi

if hash yarn 2>/dev/null; then
  echo -e "${info} Yarn found"
else
  echo -e "${error} This repository uses yarn, please run : "
  echo -e "${error} npm install -g yarn"
  exit 1
fi

# if hash docker 2>/dev/null; then
#   echo -e "${info} Docker found"
# else
#   echo -e "${error} Docker not found, first install binaries : "
#   echo -e "${error} - https://www.docker.com/products/docker-desktop"
#   exit 1
# fi

EXPECTED_NODE_VERSION=`head -1 .nvmrc`
CURRENT_NODE_VERSION="$(node -v | cut -d. -f1).$(node -v | cut -d. -f2)"
if [ $EXPECTED_NODE_VERSION == $CURRENT_NODE_VERSION ]; then
  echo -e "${info} Correct node version found $(node -v)"
else
  echo -e "${error} Wrong node version found : "
  echo -e "${error} - current: ${CURRENT_NODE_VERSION}"
  echo -e "${error} - expected: ${EXPECTED_NODE_VERSION}"
  exit 1
fi

echo -e "${success} prerequisites OK"

