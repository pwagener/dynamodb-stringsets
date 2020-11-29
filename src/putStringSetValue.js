#!/usr/bin/env node
const { DynamoDB: { DocumentClient } } = require('aws-sdk');
require('./bootstrap');
const { PK, TableName, Values } = require("./utils");

async function putStringSetValue() {
    const docClient = new DocumentClient();

    const putParams = {
        TableName,
        Item: {
            PK,
            names: docClient.createSet(Values)
        }
    }
    await docClient.put(putParams).promise();
    console.log(`Put String Set "["${Values.join(', "')}"]" into "${TableName}" with key "${PK}" and attribute "names"`);
}

if (module === require.main) {
    (async () => putStringSetValue())();
}

module.exports = { putStringSetValue };
