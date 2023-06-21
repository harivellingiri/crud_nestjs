import { config, DynamoDB } from 'aws-sdk'
require('dotenv').config();

config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

})

console.log(process.env.AWS_REGION)

const db = new DynamoDB.DocumentClient()

const Table = 'hari-user'

export {
    db,
    Table
}