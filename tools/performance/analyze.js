const componentsReport = require('../../dist/componentsReport.json');
const messagesReport = require('../../dist/messagesReport.json');
const messagingCompReport = require('../../dist/messagingCompReport.json');
const metricsReport = require('../../dist/metrics.json');

// Node Modules
console.log('largest npm', messagesReport[0].groups[0].groups[0].label);

// Speed Metrics and Network Requests
console.log(metricsReport);

// Modals Sizes
console.log(componentsReport);

// Messaging Size
console.log(messagingCompReport);
