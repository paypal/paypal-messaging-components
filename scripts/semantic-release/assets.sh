#!/bin/bash
VERSION=$1

rm -rf ./dist

npm run --silent build:standalone -- --bail --display none
npm run --silent build:legacy -- --bail --display none
npm run --silent build:components -- --bail --display none

for fullfile in ./dist/*.js; do
    filename=$(basename $fullfile .js)
    head -n 1 ./dist/"$filename".js > ./dist/messaging@"$VERSION".js
    echo "//# sourceMappingURL=$filename@$VERSION.js.map" >> ./dist/"$filename"@"$VERSION".js
    cp ./dist/"$filename".js.map ./dist/"$filename"@"$VERSION".js.map
done
