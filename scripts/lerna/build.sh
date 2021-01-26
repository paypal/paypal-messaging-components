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

while getopts ":v:e:m:" flag
do
    case "$flag" in
        v) version=$OPTARG;;
        e) environments=$OPTARG;;
        m) packages=$OPTARG;;
    esac
done

if [[ ! -z "$version" && ! $version =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[a-z0-9]+(\.[0-9]+)?)?$ ]]; then
    printf "\nInvalid version provided ($version). Please check the format (ex: 1.0.0-beta.0)\n\n"
    exit 1
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
        filteredEnvironments+=",$env"
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
# Intentionally leave the leading comma in $scope so that lerna interprets the value
# as brace expansion when there is only one package provided
lerna run build --parallel --scope "{$scope}" -- -- --env.ENVIRONMENTS="${filteredEnvironments:1}" --env.VERSION="$version"

# Remove the license file from the asset bundle
rm ./dist/*.LICENSE.txt &> /dev/null
