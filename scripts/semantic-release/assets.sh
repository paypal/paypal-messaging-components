#!/bin/bash
VERSION=$1

rm -rf ./dist

for env in "production" "sandbox" "stage"
do
    npm run --silent build:"$env" -- --bail --display none &> /dev/null

    if [ "$env" = "production" ]; then dir="js"; else dir="$env"; fi 

    rm ./dist/*.LICENSE.txt
    mkdir -p ./dist/bizcomponents/"$dir"/versioned
    mv ./dist/*.{js,map} ./dist/bizcomponents/"$dir"

    cd ./dist/bizcomponents/"$dir"

    for fullfile in ./*.js
    do
        filename=$(basename $fullfile .js)

        sed '/LICENSE.txt/d' ./"$filename".js > ./temp.txt
        cat ./temp.txt > ./"$filename".js
        rm ./temp.txt

        sed \$d ./"$filename".js > ./versioned/"$filename"@"$VERSION".js
        echo "//# sourceMappingURL=$filename@$VERSION.js.map" >> ./versioned/"$filename"@"$VERSION".js
        cp ./"$filename".js.map ./versioned/"$filename"@"$VERSION".js.map
    done

    cd ../../..
done
