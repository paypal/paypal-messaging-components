#!/bin/zsh
# not interactive so do nothing
[[ $- != *i* ]] && return
## PROMPT
autoload -U colors && colors
autoload -Uz vcs_info
precmd() {
    vcs_info
    # Print a newline before the prompt, unless it's the
    # first prompt in the process  
    if [ -z "$NEW_LINE_BEFORE_PROMPT" ]; then
        NEW_LINE_BEFORE_PROMPT=1
    elif [ "$NEW_LINE_BEFORE_PROMPT" -eq 1 ]; then
        echo ""
    fi
}
# Format vcs_info_msg_0_ variable
zstyle ':vcs_info:git:*' formats '(%b)'
# Set prompt
setopt PROMPT_SUBST
PROMPT='%B${fg[green]}${PWD/#$HOME/~} ${fg[blue]}${vcs_info_msg_0_}%f'$'\n$%b '
## HISTORY
setopt HIST_IGNORE_ALL_DUPS
setopt INC_APPEND_HISTORY
HISTFILE=${ZDOTDIR:-$HOME}/.zsh_history
HISTSIZE=2000
SAVEHIST=5000
## MAKE "LESS" FRIENDLY FOR NON-TEXT
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"
## COMPLETION
autoload -Uz compinit && compinit
## OPTIONS
# cd without the command if directory name
setopt AUTO_CD
# offer corrections for misspellings
setopt CORRECT
setopt CORRECT_ALL

