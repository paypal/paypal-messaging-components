#!/bin/bash

echo "127.0.0.1 localhost.paypal.com" | sudo tee -a /etc/hosts
npm install
npm run dev:standalone &
sleep 20