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
    printf "\nPlease supply a build version (-v)\n\n"
    exit 1
fi

if [[ ! $version =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[a-z0-9]+(\.[0-9]+)?)?$ ]]; then
    printf "\nInvalid version provided ($version). Please chack the format (ex: 1.0.0-beta.0)\n\n"
    exit 1
fi

rm -rf ./dist

IFS=',' # Set the delimiter for splitting into an array
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

    # Remove the license file from the asset bundle
    rm ./dist/*.LICENSE.txt
    # Create the necessary directories
    mkdir -p ./dist/bizcomponents/"$dir"/versioned
    mv ./dist/*.{js,map} ./dist/bizcomponents/"$dir"

    cd ./dist/bizcomponents/"$dir"

    # Create versioned copies of every asset
    for fullfile in ./*.js
    do
        filename=$(basename $fullfile .js)

        echo "/* version: $version */" > ./temp.txt

        # Remove license file line
        sed '/LICENSE.txt/d' ./"$filename".js >> ./temp.txt && mv ./temp.txt ./"$filename".js

        # Copy file minus the source map url on the last line
        sed \$d ./"$filename".js > ./versioned/"$filename"@"$version".js
        # Append the source map url to the file
        echo "//# sourceMappingURL=$filename@$version.js.map" >> ./versioned/"$filename"@"$version".js
        # Copy source map to versioned copy
        cp ./"$filename".js.map ./versioned/"$filename"@"$version".js.map
    done

    cd ../../..
done
