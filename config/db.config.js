import AWS from 'aws-sdk'

AWS.config.update({
    region: "us-east-1",
    accessKeyId: "",
    secretAccessKey: ""
})

const db = new AWS.DynamoDB.DocumentClient()

const UserTable = 'users'
const admin = 'admins'

export {
    db,
    UserTable,
    admin

}