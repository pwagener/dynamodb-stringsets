#!/usr/bin/env node
require('./bootstrap');
const { TableName, waitForTableStatus } = require("./utils");
const DynamoDB = require('aws-sdk').DynamoDB;

async function createTable() {
    const dynamo = new DynamoDB();
    let createTableInput = {
        TableName,
        AttributeDefinitions: [
            {AttributeName: "PK", AttributeType: "S"}
        ],
        KeySchema: [
            {AttributeName: "PK", KeyType: "HASH"}
        ],
        BillingMode: "PAY_PER_REQUEST"
    };

    console.log(`Creating table "${createTableInput.TableName}"`);
    await dynamo.createTable(createTableInput).promise();
    await waitForTableStatus(TableName, "ACTIVE");
}

if (module === require.main) {
    (async () => createTable())();
}

module.exports = { createTable };
