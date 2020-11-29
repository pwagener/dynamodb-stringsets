#!/usr/bin/env node
require('./bootstrap');
const DynamoDB = require('aws-sdk').DynamoDB;
const { TableName, waitForTableStatus } = require('./utils');

async function deleteTable() {
    const dynamo = new DynamoDB();
    await dynamo.deleteTable({ TableName }).promise();
    console.log(`Deleted "${TableName}" table`);
}

if (module === require.main) {
    (async () => deleteTable())();
}

module.exports = { deleteTable };
