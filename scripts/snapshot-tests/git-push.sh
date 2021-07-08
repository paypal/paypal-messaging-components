#! /usr/bin/env bash
set -ev
return_code=0

ERROR_COLOR="$( printf -- '%s' '\u001b[31m' )"
SUCCESS_COLOR="$( printf -- '%s' '\u001b[32m' )"
RESET_COLOR="$( printf -- '%s' '\u001b[0m' )"

function success_msg(){
    local format="${1}"
    shift
    printf "${SUCCESS_COLOR}${format}\n${RESET_TERM}" $@
}

function error_msg(){
    local format="${1}"
    shift
    printf "${ERROR_COLOR}ERROR: ${format}\n${RESET_TERM}" $@
}

function set_remote(){
    # set the remote so the CI will be able to make changes to the repository
    echo "git remote set-url origin \"[REDACTED_URL]\""
    git remote set-url origin "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git"
    return_code=$(( return_code + $? ))

    if [[ "${return_code}" -gt 0 ]]; then
        error_msg "Failed to set remote origin"
    fi
    return "${return_code}"
}

function checkout_develop(){
    # checkout the develop branch before commiting the new snapshots
    local total_stashes=0

    # stash any changes 
    echo -e "STASH CHANGES\n"
    git stash 
    total_stashes="$( printf '%s' $(git stash list | wc -l ) )"

    echo -e "CHECKOUT GIT REPO\n"
    git checkout --quiet develop
    return_code=$(( return_code + $? ))
    
    if [[ "${return_code}" -gt 0 ]]; then
        error_msg "Failed to checkout develop branch"
        return "${return_code}"
    fi

    if [[ "${total_stashes}" -gt 0 ]]; then
        echo -e "POP STASH\n"
        git stash pop
        return_code=$(( return_code + $? ))    
        if [[ "${return_code}" -gt 0 ]]; then
            error_msg "Failed to pop the latest stash"
        fi
    fi
    return "${return_code}"
}

function commit_files(){
    # commit any new snapshot files 
    local staged_file_count=0
    echo -e "ADD FILES\n"
    git add .
    return_code=$(( return_code + $? ))    
    if [[ "${return_code}" -gt 0 ]]; then
        error_msg "Failed to add the latest files"
        return "${return_code}"
    fi

    staged_file_count="$( printf '%s' $(
            # of the staged files, list the number of line changes for each file; count
            # how many files by counting the number of files
            git diff --cached --numstat | wc -l 
        ) 
    )"
    return_code=$(( return_code + $? ))    
    if [[ "${return_code}" -gt 0 ]]; then
        error_msg "Failed to count staged files"
        return "${return_code}"
    fi

    if [[ "${staged_file_count}" -gt 0 ]]; then
        success_msg "COUNT STAGED FILES: ${staged_file_count}"

        echo -e "COMMIT STAGED FILES\n"
        git commit --quiet -m "chore(snapshots): update $COMMIT_DETAIL [skip ci]"
        return_code=$(( return_code + $? ))    
        if [[ "${return_code}" -gt 0 ]]; then
            error_msg "Failed to commit new files"
            return "${return_code}"
        fi

        echo -e "PUSH COMMIT"
        git push -v
        return_code=$(( return_code + $? ))    
        if [[ "${return_code}" -gt 0 ]]; then
            error_msg "Failed to push new commit"
            return "${return_code}"
        fi
    else
        echo -e "${ERROR_COLOR}NO STAGED FILES FOUND,${RESET_COLOR} SKIPPING COMMIT FOR $COMMIT_DETAIL \n"
    fi

    return "${return_code}"
}


if [[ "$TRAVIS_PULL_REQUEST" = "false" ]] && [[ "$TRAVIS_BRANCH" = "develop" ]]; then
    echo -e "ATTEMPTING TO UPDATE SNAPSHOTS\n"
    
    set_remote
    return_code=$(( return_code + $? ))

    if [[ "${return_code}" -gt 0 ]]; then
        exit "${return_code}"
    fi

    checkout_develop
    return_code=$(( return_code + $? ))

    if [[ "${return_code}" -gt 0 ]]; then
        exit "${return_code}"
    fi

    commit_files
    return_code=$(( return_code + $? ))

    if [[ "${return_code}" -gt 0 ]]; then
        exit "${return_code}"
    fi
fi
