#!/bin/bash

# 'sudo echo ...' does not allow writing to /etc/hosts
echo "127.0.0.1 localhost.paypal.com" | sudo tee -a /etc/hosts

npm install
# Run the server in the background so the CI can continue
npm run dev:standalone &
# Give time for the server to startup before continuing
sleep 20