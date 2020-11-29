#!/usr/bin/env node
const util = require("util");
const { DynamoDB: { Converter, DocumentClient } } = require('aws-sdk');
require('./bootstrap');
const { PK, TableName } = require("./utils");

async function getStringSetValue() {
    const docClient = new DocumentClient();

    const getParams = {
        TableName,
        Key: { PK },
        ConsistentRead: true,
    }
    const result = await docClient.get(getParams).promise();
    console.log(`Retrieved Item with key "${PK}" from "${TableName}"`);
    console.log(`The raw Item: `, util.inspect(result.Item));
    console.log(`The raw Item.names.values:`, util.inspect(result.Item.names.values));
}

if (module === require.main) {
    (async () => getStringSetValue())();
}

module.exports = { getStringSetValue };
