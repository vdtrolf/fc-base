"use strict";
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
const acebase_1 = require("acebase");
const logger_1 = require("./logger");
const constants_1 = require("../constants");
const realm = "db";
const source = "acebasehelper.js";
let db = null;
const debug = false;
const createDb = (local) => __awaiter(void 0, void 0, void 0, function* () {
    if (db === null) {
        const options = { logLevel: "error", logColors: null, info: '', sponsor: false }; //   'verbose'};
        db = new acebase_1.AceBase("my_db", options);
    }
});
exports.createDb = createDb;
const cleanDb = () => {
    if (db && db.ready()) {
        db.query("island").take(1000).remove();
    }
};
exports.cleanDb = cleanDb;
const putItem = (tableName, Item, uniqueId) => {
    (0, logger_1.log)(realm, source, "putItem", "table " +
        tableName +
        " id: " +
        uniqueId, constants_1.LOGINFO, constants_1.LOGDATA);
    if (db && db.ready()) {
        db.ref(`${tableName}/${uniqueId}`).set(Item);
        // console.log("================ put ======");
        // console.dir(Item);
        // console.log("================ put ======");
        return true;
    }
    else {
        return false;
    }
};
exports.putItem = putItem;
const getItem = (tableName, uniqueId) => __awaiter(void 0, void 0, void 0, function* () {
    (0, logger_1.log)(realm, source, "getItem", "table " +
        tableName +
        " id: " +
        uniqueId, constants_1.LOGINFO, constants_1.LOGDATA);
    if (db && db.ready()) {
        const data = yield db.ref(`${tableName}/${uniqueId}`).get();
        if (data.exists) {
            return data.val();
        }
        else {
            return "no data";
        }
    }
    else {
        return "no db";
    }
});
exports.getItem = getItem;
const getAsyncItems = (tableName, filterIdx = "id", filterComparator = ">", filterVal = 0) => __awaiter(void 0, void 0, void 0, function* () {
    (0, logger_1.log)(realm, source, "getAsyncItems", "table " +
        tableName +
        " filter " +
        filterIdx +
        filterComparator +
        filterVal);
    if (db && db.ready()) {
        const snapshots = yield db.query(tableName)
            // .take(50)
            .filter(filterIdx, filterComparator, filterVal)
            .get();
        // console.log("================ getAsyncItems ======");
        // console.dir(snapshots.getValues());
        // console.log("================ getAsyncItems ======");
        return snapshots.getValues();
    }
    else {
        return "no db";
    }
});
exports.getAsyncItems = getAsyncItems;
const deleteItem = (tableName, uniqueId) => {
    if (db && db.ready()) {
        db.ref(`${tableName}/${uniqueId}`).remove();
        return true;
    }
    else {
        return false;
    }
};
exports.deleteItem = deleteItem;
//# sourceMappingURL=acebaseHelper.js.map