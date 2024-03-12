// import { unmarshall } from '@aws-sdk/util-dynamodb';
// import * as dotenv from 'dotenv'
// import * as https from 'https';

// import { log } from "./logger"
// import { LOGINFO, LOGERR, LOGDATA } from "../constants"
// dotenv.config()

// const import_client_dynamodb = require("@aws-sdk/client-dynamodb");
// const import_lib_dynamodb = require("@aws-sdk/lib-dynamodb");
// let client = null;
// let docClient = null

// // logger stuff
// const realm = "db";
// const source = "dynamohelper.js";


// const islandsdefs = {
//     AttributeDefinitions: [{ AttributeName: "id", AttributeType: "N" }],
//     KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 5,
//         WriteCapacityUnits: 5,
//     },
//     TableName: "islands",
// };

// const usersdefs = {
//     AttributeDefinitions: [{ AttributeName: "id", AttributeType: "N" }],
//     KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 5,
//         WriteCapacityUnits: 5,
//     },
//     TableName: "users",
// };

// const namesdefs = {
//     AttributeDefinitions: [{ AttributeName: "id", AttributeType: "N" }],
//     KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 5,
//         WriteCapacityUnits: 5,
//     },
//     TableName: "names",
// };

// const scoresdefs = {
//     AttributeDefinitions: [{ AttributeName: "id", AttributeType: "N" }],
//     KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 5,
//         WriteCapacityUnits: 5,
//     },
//     TableName: "scores",
// };

// // const agent = new https.Agent({
// //     keepAlive: true,
// //     keepAliveMsecs: 10000,
// // });

// export const createDb = async (local: boolean) => {

//     if (!client) {
//         if (local) {
//             client = new import_client_dynamodb.DynamoDBClient({ endpoint: 'http://' + process.env.DYNAMO_LOCAL_URL + ":" + process.env.DYNAMO_LOCAL_PORT });
//             docClient = import_lib_dynamodb.DynamoDBDocumentClient.from(client);
//             log(realm, source, "createDb", "connected to local");
//         } else {

//             //      //client = new DynamoDB({  httpOptions: {agent,},region: "us-east-1" });
//             //      client = new DynamoDB();

//             //      console.log("---------- DB CLIENT CREATED --------------")

//             //      log(realm, source, "createDb", "connected");
//             //      if (deepdebug) {
//             //        client.listTables({ Limit: 10 }, (err, data) => {
//             //          if (err) {
//             //            log(
//             //              realm,
//             //              source,
//             //              "createDb",
//             //              "Could not list tables" + err,
//             //              LOGERR
//             //            );
//             //          } else {
//             //            log(realm, source, "createDb", data.TableNames, LOGINFO, LOGDATA);
//             //          }
//             //        });
//             //      }
//         }
//     }
// };

// export const cleanDb = async () => {

//     let namesInitiated: boolean = true;

//     const command = new import_client_dynamodb.ListTablesCommand({});
//     const response = await client.send(command);

//     if (!response.TableNames.includes('islands')) {
//         const command = new import_client_dynamodb.CreateTableCommand(islandsdefs);
//         await client.send(command);
//         log(realm, source, "cleanDb", "Table islands created", LOGINFO, LOGDATA);
//     }

//     if (!response.TableNames.includes('users')) {
//         const command = new import_client_dynamodb.CreateTableCommand(usersdefs);
//         await client.send(command);
//         log(realm, source, "cleanDb", "Table users created", LOGINFO, LOGDATA);
//     }

//     if (!response.TableNames.includes('scores')) {
//         const command = new import_client_dynamodb.CreateTableCommand(scoresdefs);
//         await client.send(command);
//         log(realm, source, "cleanDb", "Table islands created", LOGINFO, LOGDATA);
//     }

//     if (!response.TableNames.includes('names')) {
//         const command = new import_client_dynamodb.CreateTableCommand(namesdefs);
//         await client.send(command);
//         namesInitiated = false;
//         log(realm, source, "cleanDb", "Table users created", LOGINFO, LOGDATA);
//     }

//     return namesInitiated;

// }

// // adds an item in the DB based on the table name and the unique id

// export const putItem = async (TableName: string, anItem: string, uniqueId: string) => {

//     log(realm, source, "putItem " +  uniqueId, anItem, LOGINFO, LOGDATA);

//     const command = new import_lib_dynamodb.PutCommand({
//         TableName: TableName,
//         Item: anItem
//     });

//     // console.dir(command)

//     await docClient.send(command);
//     // console.log(response);
//     return true;

//     //  client.putItem(params, (err, data) => {
//     //    if (err) {
//     //      log(
//     //        realm,
//     //        source,
//     //        "putItem Could not put data in " + TableName,
//     //        err,
//     //        LOGERR
//     //      );
//     //      return false;
//     //    } else {
//     //      log(realm, source, "putItem", "Success with puting data in " + TableName);
//     //      return true;
//     //    }
//     //  });
// };

// // get a specific item out od the Db based on an unique id

// export const getItem = async (tableName: string, uniqueId: string) => {
//     const fid = `${uniqueId}`;

//     log(realm, source, "getItem params", uniqueId, LOGINFO, LOGDATA);

//     const command = new import_client_dynamodb.QueryCommand({
//         TableName: tableName,
//         KeyConditionExpression: "id = :id",
//         ExpressionAttributeValues: {
//             ":id": { N: fid },
//         },
//         ConsistentRead: true,
//     });

//     const response = await docClient.send(command);
//     let cleanItem = {};

//     if (response.Items) {
//         try {
//             cleanItem = unmarshall(response.Items[0]);
//         } catch {
//             log(realm, source, "getItem -> no deata found for id ", uniqueId, LOGINFO, LOGDATA);
//         }
//     }

//     log(realm, source, "getItem result", response.Items[0], LOGINFO, LOGDATA);

//     return cleanItem; // <<--- Your results are here
// };

// // directly gets items on an asynchronous way - based on a set of parameters

// export const getAsyncItems = async (
//     tableName: string,
//     filterIdx: string = "id",
//     filterComparator: string = ">",
//     filterVal: number = 0
// ) => {
//     log(
//         realm,
//         source,
//         "getAsyncItems",
//         "table=" + tableName + " filter=" + filterIdx + filterComparator + filterVal
//     );

//     const fval = `${filterVal}`;
//     const command = new import_client_dynamodb.ScanCommand({
//         ExpressionAttributeValues: {
//             ":id": { N: fval },
//         },
//         FilterExpression: `${filterIdx} ${filterComparator} :id`,
//         TableName: tableName,
//     });

//     const response = await docClient.send(command);

//     const cleanItems = [];
//     for (let i = 0; i < response.Items.length; i++) {
//         cleanItems.push(unmarshall(response.Items[i]));
//     }

//     log(realm, source, "getAsyncItems results", response.Items[0], LOGINFO, LOGDATA);

//     return cleanItems;
// };

// // Delete an item based on an unique id

// export const deleteItem = (tableName: string, uniqueId: string) => {

//     const fval = `${uniqueId}`;
//     const deleteparams = {
//         Key: {
//             id: { N: fval },
//         },
//         TableName: tableName,
//     };

//     client.deleteItem(deleteparams, function(err, data) {
//         if (err) {
//             log(realm, source, "deleteItem", err, LOGERR);
//             return null;
//         } else {
//             return data;
//         }
//     });
// };
