
const DynamoDB = require('aws-sdk').DynamoDB;

async function wait(secs) {
    return new Promise((resolve) => {
        setTimeout(resolve, secs * 1000);
    });
}

async function waitForTableStatus(tableName, tableStatus) {
    console.log(`Waiting for "${tableName}" status to be "${tableStatus}"`);
    const dynamo = new DynamoDB();
    while (true) {
        await wait(3);
        const { Table: { TableStatus }} = await dynamo.describeTable({
            TableName: tableName,
        }).promise();
        console.log(`  Table status is: ${TableStatus}`);
        if (TableStatus === tableStatus) {
            break;
        }
    }
}

module.exports = {
    TableName: "StringSets-Example",
    PK: "Names",
    Values: ["Peter", "Paul", "Mary"],
    waitForTableStatus,
}
