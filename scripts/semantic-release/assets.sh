#! /usr/bin/env bash

function eval_path() {
    # get the absolute path on mac or linux 
    function reduce_path(){
         sed -E '
            s,/([^/]*)/\.\.,,g;
            s,/+,/,g;
            s,/.$,,g;
        '
    }
    local TARGET_PATH
    local CURRENT_DIR
    local TARGET_PATH_TEMP
    TARGET_PATH="$1"
    TARGET_PATH="$( echo "`eval echo ${TARGET_PATH//>}`" )"
    CURRENT_DIR="$(pwd)"
    case "$TARGET_PATH" in
        /*) 
            TARGET_PATH="$TARGET_PATH"
            ;;
        ./*) 
            TARGET_PATH="$CURRENT_DIR/$(echo "$TARGET_PATH"| cut -d/ -f2- )"
            ;;
        .) 
            TARGET_PATH="$CURRENT_DIR"
            ;;
    esac

    TARGET_PATH_TEMP="$(echo "${TARGET_PATH}" | reduce_path)"
    while [[ "${TARGET_PATH}" != "${TARGET_PATH_TEMP}" ]]; do
        TARGET_PATH="${TARGET_PATH_TEMP}"
        TARGET_PATH_TEMP="$(echo "${TARGET_PATH_TEMP}" | reduce_path)"
    done
    echo "${TARGET_PATH}"
}

this_dir="${0%/*}"
root_dir="$(eval_path "${this_dir}/../.." )"

PACKAGE_JSON="$(eval_path "${0%/*}/../../package.json" )"
PACKAGE_VERSION="$( 
    # only print the line containing the version, and only use its value (between the double quotes)
    sed -nE '/"version"/p' "${PACKAGE_JSON}" | \
    cut -d '"' -f4 
)"

VERSION="${1}"

if [[ ${#VERSION} -eq 0 || "${VERSION}" =~ "x\.x\.x" ]]; then
    echo "Please provide the next version number (ie: 'npm run build -- x.x.x'). The current version is ${PACKAGE_VERSION}"
    exit 1
fi

# update the package version
sed -i ".bak" -E "s,(\"version\": )\"${PACKAGE_VERSION}\",\1\"${VERSION}\"," "${PACKAGE_JSON}" && \
rm "${PACKAGE_JSON}.bak"

if [[ $? -gt 0 ]]; then
    echo "FAILED TO UPDATE THE PACKAGE VERSION"
    exit 1
fi

TMP_DIR="$(mktemp -d)"
TMP_FILE="${TMP_DIR}/temp.txt"

echo "Clearing dist directory..." && \
rm -rf ./dist 

if [[ $? -gt 0 ]]; then
    echo "FAILED TO CLEAR THE DIST DIRECTORY"
    rm -rf "${TMP_DIR}" 
    exit 1
fi

echo "Building legacy..." && \
npm_output="$(npm run build:legacy -- --bail 2>&1)"
if [[ $? -gt 0 ]]; then
    echo "FAILED TO BUILD LEGACY"
    echo -e "${npm_output}"
    exit 1
fi

rm ./dist/*.LICENSE.txt 2>/dev/null && \
echo "Removing *.LICENSE.txt from dist directory..." || \
echo "No *.LICENSE.txt present in dist directory." 

mkdir -p ./dist/bizcomponents/js/versioned && \
    mv ./dist/*.{js,map} ./dist/bizcomponents/js && \
    cd ./dist/bizcomponents/js
if [[ $? -gt 0 ]]; then
    echo "FAILED TO MOVE ASSETS TO dist/bizcomponents"
    rm -rf "${TMP_DIR}" 
    exit 1
else
    new_files=()
    old_files=()
    for fullfile in ./*.js; do
        filename=$(basename "${fullfile}" .js)
        
        filepath_js="./${filename}.js"
        filepath_js_map="./${filename}.js.map"

        file_js_versioned="${filename}@${VERSION}.js"
        file_js_map_versioned="${filename}@${VERSION}.js.map"

        filepath_js_versioned="./versioned/${file_js_versioned}"
        filepath_js_map_versioned="./versioned/${file_js_map_versioned}"
        echo "Processing '${filename}' files..."
        
        old_files+=( 
            $( git diff --name-only | egrep "dist" | egrep "${filename}" | tr '\n' ' ') 
        )
        
        echo "    Removing LICENSE.txt from '${filepath_js}'..." && \
        sed '/LICENSE.txt/d' "${filepath_js}" > "${TMP_FILE}" && \
        cat "${TMP_FILE}" > "${filepath_js}" && \
        rm "${TMP_FILE}" 
        if [[ $? -gt 0 ]]; then
            echo "FAILED TO REMOVE LICENSE.txt FROM '${filename}'"
            rm -rf "${TMP_DIR}" 
            exit 1
        fi
        
        # Copy filepath_js to filepath_js_versioned while making the following changes:
        echo "    Copy '${filepath_js}' to '${filepath_js_versioned}' and add sourceMappingURL" && \
        sed "
            # if it is the last line
            \${
                # delete the last line
                d;

                # append sourceMappingURL to the end of the file
                a \\
\/\/\# sourceMappingURL=${versioned_js_map_file}
            }
        " "${filepath_js}" > "${filepath_js_versioned}" && \
        cp "${filepath_js_map}" "${filepath_js_map_versioned}"

        if [[ $? -gt 0 ]]; then
            echo "FAILED create versioned copy of '${filepath_js}'"
            rm -rf "${TMP_DIR}" 
            exit 1
        fi 

        if [[ "${filename}" == "smart-credit-modal" ]]; then
            rm "${filepath_js}" "${filepath_js_map}"
            new_files+=( 
                "${filepath_js_versioned}"
                "${filepath_js_map_versioned}"
            )
        else
            new_files+=( 
                "${filepath_js}"
                "${filepath_js_map}"
                "${filepath_js_versioned}"
                "${filepath_js_map_versioned}"
            )
        fi
    done
    # we should now have files similar to the following: 
    #     dist/bizcomponents/js/merchant.js
    #     dist/bizcomponents/js/merchant.js.map
    #     dist/bizcomponents/js/versioned/merchant@VERSION.js
    #     dist/bizcomponents/js/versioned/merchant@VERSION.js.map
    #     dist/bizcomponents/js/versioned/smart-credit-modal@VERSION.js
    #     dist/bizcomponents/js/versioned/smart-credit-modal@VERSION.js.map

    all_files=( "${PACKAGE_JSON}" )

    printf "Adding files:\n" 
    printf '    package.json\n'
    for file in ${new_files[@]}; do 
        filepath="$(echo "${file}" | sed -E 's,^\./,dist/bizcomponents/js/,g')"
        all_files+=( "${filepath}" )
        printf '    %s\n' "${filepath}"
    done

    printf "Removing files:\n" 
    for file in ${old_files[@]}; do 
        filepath="$(echo "${file}" | sed -E 's,^\./,dist/bizcomponents/js/,g')"
        # if the file has been changed (already addeded when processing "new_files")
        if [[ "$( printf '%s\n' ${all_files[@]} | egrep "${filepath}" | wc -m )" -eq 0 ]]; then
            all_files+=( "${filepath}" )
            printf '    %s\n' "${filepath}"
        fi
    done


    all_files=(
        $(
            # ensure there are no duplicates and sort 
            printf '%s\n' ${all_files[@]} | \
            sort -u 
        )
    )

    # if we succesfully setup the dist files, add them to the git repo
    git -C "${root_dir}" add ${all_files[@]}  

    if [[ $? -gt 0 ]]; then
        echo "FAILED add changes to git"
        rm -rf "${TMP_DIR}" 
        exit 1
    fi
    echo "Review the changes and commit"
fi

rm -rf "${TMP_DIR}" 

echo "Done building merchant.js"
