
process.env.AWS_SDK_LOAD_CONFIG = `true`;
process.env.AWS_NODEJS_CONNECTION_REUSE_ENABLED = `1`;
require('dotenv/config');

const os = require('os');
console.log(`Running On: ${os.platform()} ${os.release()}`);

console.log(`Node version: ${process.version}`);

const awsSDK = require('aws-sdk');
console.log(`AWS SDK version: ${awsSDK.VERSION}`);
console.log(`-------------------------`);
