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


PACKAGE_VERSION="$( 
    # only print the line containing the version, and only use its value (between the double quotes)
    sed -nE '/"version"/p' "${0%/*}/../../package.json" | \
    cut -d '"' -f4 
)"

VERSION="${1}"

if [[ ${#VERSION} -eq 0 || "${VERSION}" =~ "x\.x\.x" ]]; then
    echo "Please provide the next version number (ie: 'npm run build -- x.x.x'). The current version is ${PACKAGE_VERSION}"
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

echo "Building standalone..." && \
npm run --silent build:standalone -- --bail --display none &> /dev/null 
if [[ $? -gt 0 ]]; then
    echo "FAILED TO BUILD STANDALONE"
fi

echo "Building legacy..." && \
npm run --silent build:legacy -- --bail --display none &> /dev/null 
if [[ $? -gt 0 ]]; then
    echo "FAILED TO BUILD LEGACY"
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
        
        new_files+=( 
            "${filepath_js}"
            "${filepath_js_map}"
            "${filepath_js_versioned}"
            "${filepath_js_map_versioned}"
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
    done

    all_files="$(
        for file in ${new_files[@]}; do 
            printf '%s ' "${file}" | sed -E 's,^\./,dist/bizcomponents/js/,g'
        done
        for file in ${old_files[@]}; do 
            printf '%s ' "${file}" | sed -E 's,^\./,dist/bizcomponents/js/,g'
        done
    )"
    # if we succesfully setup the dist files, add them to the git repo
    echo "git -C \"${root_dir}\" add \\
$(
            echo ${all_files} | \
            tr ' ' '\n' | \
            sed -E '

                # indent the files names within the git command 
                s,^,    ,g; 

                # add a backslash to the end of each file
                s,$, \\,g;

                # remove the backslash from the last file
                ${
                    s,\\$,,g;
                }
            ' 
        )" && \
    git -C "${root_dir}" add ${all_files}

    if [[ $? -gt 0 ]]; then
        echo "FAILED add changes to git"
        rm -rf "${TMP_DIR}" 
        exit 1
    fi 
fi

rm -rf "${TMP_DIR}" 

echo "Done building merchant.js"
