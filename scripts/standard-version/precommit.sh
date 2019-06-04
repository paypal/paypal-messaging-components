#!/bin/bash
VERSION=$(cat ./package.json | grep -m 1 "version" | sed -E 's/.*"([^"]+)".*/\1/')

rm -rf ./dist

npm run build
npm run build:legacy

head -n 1 ./dist/messaging.js > ./dist/messaging@"$VERSION".js
echo "//# sourceMappingURL=messaging@${VERSION}.js.map" >> ./dist/messaging@"$VERSION".js
cp ./dist/messaging.js.map ./dist/messaging@"$VERSION".js.map

head -n 1 ./dist/merchant.js > ./dist/merchant@"$VERSION".js
echo "//# sourceMappingURL=merchant@${VERSION}.js.map" >> ./dist/merchant@"$VERSION".js
cp ./dist/merchant.js.map ./dist/merchant@"$VERSION".js.map

git add dist