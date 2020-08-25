#!/bin/bash
VERSION=$1

rm -rf ./dist

npm run --silent build:prod -- --bail --display none &> /dev/null

rm ./dist/*.LICENSE.txt
mkdir -p ./dist/bizcomponents/js/versioned
mv ./dist/*.{js,map} ./dist/bizcomponents/js

cd ./dist/bizcomponents/js

for fullfile in ./*.js; do
    filename=$(basename $fullfile .js)

    sed '/LICENSE.txt/d' ./"$filename".js > ./temp.txt
    cat ./temp.txt > ./"$filename".js
    rm ./temp.txt

    sed \$d ./"$filename".js > ./versioned/"$filename"@"$VERSION".js
    echo "//# sourceMappingURL=$filename@$VERSION.js.map" >> ./versioned/"$filename"@"$VERSION".js
    cp ./"$filename".js.map ./versioned/"$filename"@"$VERSION".js.map
done
