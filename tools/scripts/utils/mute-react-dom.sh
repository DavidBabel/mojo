#!/bin/bash

. ./tools/scripts/utils/echo-utils.sh

echo -e "${info} mute annoying react-dom module warnings"
find node_modules/react-dom/**/*.js -exec sed -i.bak "s/error('useLayoutEffect does nothing/\/\/error(' useLayoutEffect does nothing/g" {} \; &>/dev/null
