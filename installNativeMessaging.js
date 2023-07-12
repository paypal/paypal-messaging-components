#!/usr/local/bin/node
const fs = require('fs');
const path = require('path');

const sourceFilePath = './com.paypal.messaging.json';
const destinationFilePath = path.join(
    process.env.HOME,
    'Library/Application Support/Google/Chrome/NativeMessagingHosts/com.paypal.messaging.json'
);

// Read the JSON file
fs.readFile(sourceFilePath, 'utf8', (err, data) => {
    if (err) {
        return;
    }

    // Parse the JSON data
    let jsonData;
    try {
        jsonData = JSON.parse(data);
    } catch (parseError) {
        return;
    }

    // Update the property with the full working directory
    jsonData.path = process.cwd();
    jsonData.path += '/nativeMessaging.js';

    // Convert the JSON object back to a string
    const updatedData = JSON.stringify(jsonData, null, 2);

    // Write the updated JSON back to the file
    fs.writeFile(sourceFilePath, updatedData, 'utf8', writeErr => {
        if (writeErr) {
            return;
        }

        // Move the file to the destination
        fs.copyFile(sourceFilePath, destinationFilePath, copyErr => {
            if (copyErr) {
                console.log('Error copying the file:', copyErr);
                return;
            }

            console.log('File edited and moved successfully!');
        });
    });
});
