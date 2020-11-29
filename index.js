#!/usr/bin/env node

require('./src/bootstrap');
const { createTable } = require('./src/createTable');
const { putStringSetValue } = require('./src/putStringSetValue');
const { getStringSetValue } = require('./src/getStringSetValue');

(async () => {
    await createTable();
    await putStringSetValue();
    await getStringSetValue();

    console.log(`-------------------------`);
    console.log(`Done.  To clean up, run:`);
    console.log(`    ./src/deleteTable.js`)
})();
