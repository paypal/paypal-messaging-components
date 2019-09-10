#!/bin/bash
VERSION=$(echo $0 | cut -f2 -d"v")

rm -rf ./dist

npm run --silent build:standalone -- --bail --display none
npm run --silent build:legacy -- --bail --display none

head -n 1 ./dist/messaging.js > ./dist/messaging@"$VERSION".js
echo "//# sourceMappingURL=messaging@${VERSION}.js.map" >> ./dist/messaging@"$VERSION".js
cp ./dist/messaging.js.map ./dist/messaging@"$VERSION".js.map

head -n 1 ./dist/merchant.js > ./dist/merchant@"$VERSION".js
echo "//# sourceMappingURL=merchant@${VERSION}.js.map" >> ./dist/merchant@"$VERSION".js
cp ./dist/merchant.js.map ./dist/merchant@"$VERSION".js.map
