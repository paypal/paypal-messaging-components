#!/bin/bash
SUPPORTED_ENVIRONMENTS=("production" "sandbox" "stage")
SUPPORTED_PACKAGES_MAP=(
    "library:@paypal/messaging-components"
    "components:messaging-components"
    "renderer:messaging-renderer"
    "content:messaging-content"
)
# default value if none supplied
environments="production,sandbox,stage"
packages="library,components,renderer"

while getopts ":v:e:m:t:a:" flag
do
    case "$flag" in
        v) version=$OPTARG;;
        e) environments=$OPTARG;;
        m) packages=$OPTARG;;
        t) tag=$OPTARG;;
        s) testEnv=$OPTARG;;
    esac
done

if [[ ! -z "$version" && ! $version =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[a-z0-9]+(\.[0-9]+)?)?$ ]]; then
    printf "Invalid version provided ($version). Please check the format (ex: 1.0.0-beta.0)\n\n"
    exit 1
fi

if [ ! -z "$tag" ]; then
    if [ $environments != "stage" ]; then
        printf "Only \"stage\" environment is supported with tag input\n\n"
        exit 1
    fi
    if [[ ! $tag =~ ^[a-zA-Z0-9_]+$ ]]; then
        printf "Stage tag must only contain alpha-numeric and underscore characters\n\n"
        exit 1
    fi
fi

if [[ ! -z "$testEnv" ]]; then
    # Ensure proper prefix
    testEnv="https://www.$(echo $testEnv | sed -E 's/(https?:\/\/)?(www.)?(.+)/\3/')"
fi

rm -rf ./dist

IFS=',' # Set the delimiter for splitting into an array
read -a envarr <<< "$environments"
read -a packagesarr <<< "$packages"

printf "\nBuilding the following environments (v$version):"
# Filter out unsupported environment keywords or typos
for env in "${envarr[@]}"
do
    if printf '%s\n' "${SUPPORTED_ENVIRONMENTS[@]}" | grep -q -e "^$env$"; then
        printf "\n  - $env"
        filteredEnvironments+=("$env")
    fi
done
printf "\n"

printf "\nBuilding the following modules (v$version):"
# Filter out unsupported environment keywords or typos
for package in "${packagesarr[@]}"
do
    match=$(printf '%s\n' "${SUPPORTED_PACKAGES_MAP[@]}" | grep -m 1 -e "^$package:")

    if [ ! -z "$match" ]; then
        printf "\n  - $package"
        scope+=",${match#*:}"
    fi
done
printf "\n\n"

# Optional webpack args
[[ ! -z "$tag" ]] && optionalArgs+=("--env.STAGE_TAG=$tag")
[[ ! -z "$version" ]] && optionalArgs+=("--env.VERSION=$version")
[[ ! -z "$testEnv" ]] && optionalArgs+=("--env.TEST_ENV=$testEnv")

for env in "${filteredEnvironments[@]}"
do
    # Intentionally leave the leading comma in $scope so that lerna interprets the value
    # as brace expansion when there is only one package provided
    lerna run build --parallel --scope "{$scope}" -- -- --env.NODE_ENV="$env" ${optionalArgs[@]}
done

# Remove the license file from the asset bundle
find ./dist -name '*.LICENSE.txt' -delete

if [ ! -z "$tag" ]; then
    if [ ! command -v web &> /dev/null ]; then
        printf "\nPlease install the 'web' cli tool using 'npm i -g @paypalcorp/web' to deploy the stage tag version\n\n"
        exit 1
    fi

    # Manually replace the globals.js variable so that it applies to the SDK bundler
    sed -i '' "s/env.STAGE_TAG/'$tag'/" ./packages/library/globals.js
    # Pack the library module similar to publishing the module to npm
    (cd ./packages/library; npm pack)
    mv ./packages/library/*.tgz ./dist/bizcomponents/stage/package.tgz
    # Reset the manual stage tag
    sed -i '' "s/'$tag'/env.STAGE_TAG/" ./packages/library/globals.js

    printf "\nweb stage --tag $tag\n"
    web stage --tag "$tag"
    echo "https://UIDeploy--StaticContent--$tag--ghe.preview.dev.paypalinc.com/upstream"

    rm ./dist/bizcomponents/stage/package.tgz
fi