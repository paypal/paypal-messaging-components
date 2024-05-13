#!/bin/bash

echo "127.0.0.1 localhost.paypal.com" | sudo tee -a /etc/hosts

((npm run dev:standalone 2>&1 & echo $! > pid.log) | tee server.log) &
sleep 40

error_count=$(grep -iv 'errorboundary' server.log | grep -i 'error' | wc -l)
echo "Errors Found: $error_count"
if [[ $error_count -gt 0 ]]; then
    echo "Errors found in server.log:"
    grep -i error server.log   # Print out the errors found
    echo "Exiting server"
    kill $(<pid.log)
    exit 1
fi
