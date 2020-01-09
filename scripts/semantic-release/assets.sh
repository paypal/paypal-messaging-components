#!/bin/bash
VERSION=$1

rm -rf ./dist

npm run --silent build:standalone -- --bail --display none &> /dev/null
npm run --silent build:legacy -- --bail --display none &> /dev/null

mkdir -p ./dist/bizcomponents/js/versioned
mv ./dist/*.{js,map} ./dist/bizcomponents/js

cd ./dist/bizcomponents/js

for fullfile in ./*.js; do
    filename=$(basename $fullfile .js)
    head -n 1 ./"$filename".js > ./versioned/"$filename"@"$VERSION".js
    echo "//# sourceMappingURL=$filename@$VERSION.js.map" >> ./versioned/"$filename"@"$VERSION".js
    cp ./"$filename".js.map ./versioned/"$filename"@"$VERSION".js.map
done
