var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { AceBase } = require("acebase");
// logger stuff
const loggerReq = require("./logger.js");
let log = loggerReq.log;
const LOGVERB = loggerReq.LOGVERB;
const LOGINFO = loggerReq.LOGINFO;
const LOGERR = loggerReq.LOGERR;
const LOGDATA = loggerReq.LOGDATA;
const realm = "db";
const source = "acebasehelper.js";
let db = null;
const debug = false;
const createDb = () => {
    if (db === null) {
        const options = { logLevel: "err" }; //   'verbose'};
        db = new AceBase("my_db", options);
    }
};
const cleanDb = () => {
    if (db && db.ready()) {
        db.query("island").take(1000).remove();
    }
};
const putItem = (tableName, Item, uniqueId) => {
    log(realm, source, "putItem", "table " +
        tableName +
        " id: " +
        uniqueId, LOGINFO, LOGDATA);
    if (db && db.ready()) {
        db.ref(`${tableName}/${uniqueId}`).set(Item);
        //console.log("================ put ======");
        //console.dir(Item);
        //console.log("================ put ======");
        return true;
    }
    else {
        return false;
    }
};
const getItem = (tableName, uniqueId) => __awaiter(this, void 0, void 0, function* () {
    log(realm, source, "getItem", "table " +
        tableName +
        " id: " +
        uniqueId, LOGINFO, LOGDATA);
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
const getAsyncItems = (tableName, filterIdx = "id", filterComparator = ">", filterVal = 0) => __awaiter(this, void 0, void 0, function* () {
    log(realm, source, "getAsyncItems", "table " +
        tableName +
        " filter " +
        filterIdx +
        filterComparator +
        filterVal);
    if (db && db.ready()) {
        const snapshots = yield db.query(tableName)
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
const deleteItem = (tableName, uniqueId) => {
    if (db && db.ready()) {
        db.ref(`${tableName}/${uniqueId}`).remove();
        return true;
    }
    else {
        return false;
    }
};
// now we export the class, so other modules can create Penguin objects
module.exports = {
    getAsyncItems,
    putItem,
    getItem,
    deleteItem,
    createDb,
    cleanDb
};
//# sourceMappingURL=acebasehelper.js.map