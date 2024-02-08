"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.getAsyncItems = exports.getItem = exports.putItem = exports.cleanDb = exports.createDb = void 0;
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const dotenv = __importStar(require("dotenv"));
const https = __importStar(require("https"));
const logger_1 = require("./logger");
const constants_1 = require("../constants");
dotenv.config();
let import_client_dynamodb = require("@aws-sdk/client-dynamodb");
let import_lib_dynamodb = require("@aws-sdk/lib-dynamodb");
let client = null;
let docClient = null;
// logger stuff
const realm = "db";
const source = "dynamohelper.js";
const islandsdefs = {
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "N" }],
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
    TableName: "islands",
};
const usersdefs = {
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "N" }],
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
    TableName: "users",
};
const namesdefs = {
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "N" }],
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
    TableName: "names",
};
const scoresdefs = {
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "N" }],
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
    TableName: "scores",
};
const agent = new https.Agent({
    keepAlive: true,
    keepAliveMsecs: 10000,
});
const createDb = (local) => __awaiter(void 0, void 0, void 0, function* () {
    if (!client) {
        if (local) {
            client = new import_client_dynamodb.DynamoDBClient({ endpoint: 'http://' + process.env.DYNAMO_LOCAL_URL + ":" + process.env.DYNAMO_LOCAL_PORT });
            docClient = import_lib_dynamodb.DynamoDBDocumentClient.from(client);
            (0, logger_1.log)(realm, source, "createDb", "connected to local");
        }
        else {
            //      //client = new DynamoDB({  httpOptions: {agent,},region: "us-east-1" });
            //      client = new DynamoDB();
            //      console.log("---------- DB CLIENT CREATED --------------")
            //      log(realm, source, "createDb", "connected");
            //      if (deepdebug) {
            //        client.listTables({ Limit: 10 }, (err, data) => {
            //          if (err) {
            //            log(
            //              realm,
            //              source,
            //              "createDb",
            //              "Could not list tables" + err,
            //              LOGERR
            //            );
            //          } else {
            //            log(realm, source, "createDb", data.TableNames, LOGINFO, LOGDATA);
            //          }
            //        });
            //      }
        }
    }
});
exports.createDb = createDb;
const cleanDb = () => __awaiter(void 0, void 0, void 0, function* () {
    let namesInitiated = true;
    const command = new import_client_dynamodb.ListTablesCommand({});
    const response = yield client.send(command);
    if (!response.TableNames.includes('islands')) {
        const command = new import_client_dynamodb.CreateTableCommand(islandsdefs);
        const response = yield client.send(command);
        (0, logger_1.log)(realm, source, "cleanDb", "Table islands created", constants_1.LOGINFO, constants_1.LOGDATA);
    }
    if (!response.TableNames.includes('users')) {
        const command = new import_client_dynamodb.CreateTableCommand(usersdefs);
        const response = yield client.send(command);
        (0, logger_1.log)(realm, source, "cleanDb", "Table users created", constants_1.LOGINFO, constants_1.LOGDATA);
    }
    if (!response.TableNames.includes('scores')) {
        const command = new import_client_dynamodb.CreateTableCommand(scoresdefs);
        const response = yield client.send(command);
        (0, logger_1.log)(realm, source, "cleanDb", "Table islands created", constants_1.LOGINFO, constants_1.LOGDATA);
    }
    if (!response.TableNames.includes('names')) {
        const command = new import_client_dynamodb.CreateTableCommand(namesdefs);
        const response = yield client.send(command);
        namesInitiated = false;
        (0, logger_1.log)(realm, source, "cleanDb", "Table users created", constants_1.LOGINFO, constants_1.LOGDATA);
    }
    return namesInitiated;
});
exports.cleanDb = cleanDb;
// adds an item in the DB based on the table name and the unique id
const putItem = (TableName, anItem, uniqueId) => __awaiter(void 0, void 0, void 0, function* () {
    (0, logger_1.log)(realm, source, "putItem", anItem, constants_1.LOGINFO, constants_1.LOGDATA);
    const command = new import_lib_dynamodb.PutCommand({
        TableName: TableName,
        Item: anItem
    });
    // console.dir(command)
    const response = yield docClient.send(command);
    // console.log(response);
    return true;
    //  client.putItem(params, (err, data) => {
    //    if (err) {
    //      log(
    //        realm,
    //        source,
    //        "putItem Could not put data in " + TableName,
    //        err,
    //        LOGERR
    //      );
    //      return false;
    //    } else {
    //      log(realm, source, "putItem", "Success with puting data in " + TableName);
    //      return true;
    //    }
    //  });
});
exports.putItem = putItem;
// get a specific item out od the Db based on an unique id
const getItem = (tableName, uniqueId) => __awaiter(void 0, void 0, void 0, function* () {
    let id = new Date().getTime() % 100;
    const fid = `${uniqueId}`;
    (0, logger_1.log)(realm, source, "getItem params", uniqueId, constants_1.LOGINFO, constants_1.LOGDATA);
    const command = new import_client_dynamodb.QueryCommand({
        TableName: tableName,
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": { N: fid },
        },
        ConsistentRead: true,
    });
    const response = yield docClient.send(command);
    let cleanItem = {};
    if (response.Items) {
        try {
            cleanItem = (0, util_dynamodb_1.unmarshall)(response.Items[0]);
        }
        catch (_a) {
            (0, logger_1.log)(realm, source, "getItem -> no deata found for id ", uniqueId, constants_1.LOGINFO, constants_1.LOGDATA);
        }
    }
    (0, logger_1.log)(realm, source, "getItem result", response.Items[0], constants_1.LOGINFO, constants_1.LOGDATA);
    return cleanItem; // <<--- Your results are here
});
exports.getItem = getItem;
// directly gets items on an asynchronous way - based on a set of parameters
const getAsyncItems = (tableName, filterIdx = "id", filterComparator = ">", filterVal = 0) => __awaiter(void 0, void 0, void 0, function* () {
    (0, logger_1.log)(realm, source, "getAsyncItems", "table=" + tableName + " filter=" + filterIdx + filterComparator + filterVal);
    const fval = `${filterVal}`;
    const command = new import_client_dynamodb.ScanCommand({
        ExpressionAttributeValues: {
            ":id": { N: fval },
        },
        FilterExpression: `${filterIdx} ${filterComparator} :id`,
        TableName: tableName,
    });
    const response = yield docClient.send(command);
    let cleanItems = [];
    for (let i = 0; i < response.Items.length; i++) {
        cleanItems.push((0, util_dynamodb_1.unmarshall)(response.Items[i]));
    }
    (0, logger_1.log)(realm, source, "getAsyncItems results", response.Items[0], constants_1.LOGINFO, constants_1.LOGDATA);
    return cleanItems;
});
exports.getAsyncItems = getAsyncItems;
// Delete an item based on an unique id
const deleteItem = (tableName, uniqueId) => {
    const fval = `${uniqueId}`;
    var deleteparams = {
        Key: {
            id: { N: fval },
        },
        TableName: tableName,
    };
    client.deleteItem(deleteparams, function (err, data) {
        if (err) {
            (0, logger_1.log)(realm, source, "deleteItem", err, constants_1.LOGERR);
            return null;
        }
        else {
            return data;
        }
    });
};
exports.deleteItem = deleteItem;
//# sourceMappingURL=dynamoHelper.js.map