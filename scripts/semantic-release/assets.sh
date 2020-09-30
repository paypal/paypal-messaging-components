#!/bin/bash
SUPPORTED_ENVIRONMENTS=("production" "sandbox" "stage")
# default value if none supplied
environment="production"

while getopts ":v:e:" flag
do
    case "$flag" in
        v) version=$OPTARG;;
        e) environment=$OPTARG;;
    esac
done

if [ -z "$version" ]; then
    printf "\nPlease supply a version number (-v)\n\n"
    exit 1
fi

rm -rf ./dist

IFS=','
read -a envarr <<< "$environment"

printf "\nBuilding the following environments (v$version):"
# Filter out unsupported environment keywords or typos
for env in "${envarr[@]}"
do
    if printf '%s\n' "${SUPPORTED_ENVIRONMENTS[@]}" | grep -q -e "^$env$"; then
        printf "\n  - $env"
        filteredEnvArr+=("$env")
    fi
done
printf "\n\n"

# Build assets for each environment
for env in "${filteredEnvArr[@]}"
do
    npm run --silent build:"$env" -- --env.VERSION="$version" --bail --display none &> /dev/null

    if [ "$env" = "production" ]; then dir="js"; else dir="$env"; fi 

    rm ./dist/*.LICENSE.txt
    mkdir -p ./dist/bizcomponents/"$dir"/versioned
    mv ./dist/*.{js,map} ./dist/bizcomponents/"$dir"

    cd ./dist/bizcomponents/"$dir"

    # Create versioned copies of every asset
    for fullfile in ./*.js
    do
        filename=$(basename $fullfile .js)

        sed '/LICENSE.txt/d' ./"$filename".js > ./temp.txt
        cat ./temp.txt > ./"$filename".js
        rm ./temp.txt

        sed \$d ./"$filename".js > ./versioned/"$filename"@"$version".js
        echo "//# sourceMappingURL=$filename@$version.js.map" >> ./versioned/"$filename"@"$version".js
        cp ./"$filename".js.map ./versioned/"$filename"@"$version".js.map
    done

    cd ../../..
done
