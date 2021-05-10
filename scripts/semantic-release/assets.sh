#!/bin/bash
SUPPORTED_ENVIRONMENTS=("production" "sandbox" "stage")
SUPPORTED_MODULES=("library" "components" "render")
# default value if none supplied
environment="production,sandbox,stage"
module="library,components,render"

while getopts ":v:e:m:t:s:" flag
do
    case "$flag" in
        v) version=$OPTARG;;
        e) environment=$OPTARG;;
        m) module=$OPTARG;;
        t) tag=$OPTARG;;
        s) testEnv=$OPTARG;;
    esac
done

if [ -z "$version" ]; then
    # Extract the version from the package.json 
    version=$(cat ./package.json | awk '/version/' | sed "s/[^0-9.]//g")
fi

if [ ! -z "$tag" ]; then
    if [[ ! $tag =~ ^[a-zA-Z0-9_]+$ ]]; then
        printf "Stage tag must only contain alpha-numeric and underscore characters\n\n"
        exit 1
    fi
    # Underscores not valid semver
    version=$version-$(echo $tag | sed "s/_/-/g" | sed -E "s/-([0-9]+)$/.\1/")
fi

if [[ ! -z "$testEnv" ]]; then
    # Ensure proper prefix
    testEnv="$(echo $testEnv | sed -E 's/(https?:\/\/)?(www.)?([^\/]+)(.+)?/\3/')"
fi

if [[ ! -z "$tag" || ! -z "$testEnv" ]]; then
    # Only stage is supported for Test Environments and Stage Tags
    environment="stage"
fi

if [[ ! $version =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9_-]+(\.[0-9]+)?)?$ ]]; then
    printf "\nInvalid version provided ($version). Please chack the format (ex: 1.0.0-beta.0)\n\n"
    exit 1
fi

rm -rf ./dist

IFS=',' # Set the delimiter for splitting into an array
read -a envarr <<< "$environment"
read -a modulearr <<< "$module"

printf "v$version\n"
printf "\nBuilding the following environments:"
# Filter out unsupported environment keywords or typos
for env in "${envarr[@]}"
do
    if printf '%s\n' "${SUPPORTED_ENVIRONMENTS[@]}" | grep -q -e "^$env$"; then
        [[ "$env" = "stage" && ! -z "$testEnv" ]] && printf "\n  - $env ($testEnv)" || printf "\n  - $env"

        filteredEnvArr+=("$env")
    fi
done
printf "\n"

printf "\nBuilding the following modules:"
# Filter out unsupported environment keywords or typos
for mod in "${modulearr[@]}"
do
    if printf '%s\n' "${SUPPORTED_MODULES[@]}" | grep -q -e "^$mod$"; then
        printf "\n  - $mod"
        filteredModule+=",$mod"
    fi
done
printf "\n\n"
filteredModule="${filteredModule:1}"

# Optional webpack args
[[ ! -z "$tag" ]] && optionalArgs+=("--env.STAGE_TAG=$tag")
[[ ! -z "$testEnv" ]] && optionalArgs+=("--env.TEST_ENV=https://www.$testEnv")

# Build assets for each environment
for env in "${filteredEnvArr[@]}"
do
    npm run --silent build:"$env" -- --env.VERSION="$version" --env.MODULE="$filteredModule" ${optionalArgs[@]} --bail --display none &> /dev/null

    if [ "$env" = "production" ]; then dir="js"; else dir="$env"; fi 

    # Remove the license file from the asset bundle
    rm ./dist/*.LICENSE.txt &> /dev/null
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

# Deploy to stage CDN
if [ ! -z "$tag" ]; then
    if ! command -v web &> /dev/null; then
        printf "\nPlease install the 'web' cli tool using 'npm i -g @paypalcorp/web' to deploy the stage tag version\n\n"
        exit 1
    fi

    # Manually replace the globals.js variables so that it applies to the SDK bundler
    sed -i '' "s/env.STAGE_TAG/'$tag'/" ./globals.js
    sed -i '' "s/env.VERSION/'$version'/" ./globals.js
    [[ ! -z "$testEnv" ]] && sed -i '' "s/env.TEST_ENV/'$testEnv'/" ./globals.js
    # Pack the library module similar to publishing the module to npm
    npm pack
    mv ./*.tgz ./dist/bizcomponents/stage/package.tgz
    # Reset the manual variables
    sed -i '' "s/'$tag'/env.STAGE_TAG/" ./globals.js
    sed -i '' "s/'$version'/env.VERSION/" ./globals.js
    [[ ! -z "$testEnv" ]] && sed -i '' "s/'$testEnv'/env.TEST_ENV/" ./globals.js

    printf "\nweb stage --tag $tag\n"
    web stage --tag "$tag"
    echo "https://UIDeploy--StaticContent--$tag--ghe.preview.dev.paypalinc.com/upstream/bizcomponents/stage?cdn:list"

    rm ./dist/bizcomponents/stage/package.tgz
fi