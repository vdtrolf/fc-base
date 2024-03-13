import { AceBase, AceBaseLocalSettings } from "acebase";
import { log } from "./logger"
import { LOGINFO, LOGDATA } from "../constants"
import { IDBHelper } from "../helpers/databaseHelper"

export class AcebaseDBHelper implements IDBHelper {
    local: boolean;
    debug: boolean;
    realm: string;
    source: string;
    db;

    constructor(local: boolean) {
        this.local = local;
        this.debug = false;
        this.realm = "this.db";
        this.source = "acebasehelper.js";
        this.db = null;
    }

    createDb = async (local: boolean) => {
        this.local = local;
        if (this.db === null) {
            const options: AceBaseLocalSettings = { logLevel: "error", logColors: null, info: '', sponsor: false };
            this.db = new AceBase("my_this.db", options);
        }
    };

    cleanDb = (): boolean => {
        if (this.db && this.db.ready()) {
            this.db.query("island").take(1000).remove();
        }
        return true;
    };

    putItem = (tableName: string, item, uniqueId: number): boolean => {



        log(this.realm, this.source, "putItem",
            "table " +
            tableName +
            " id: " +
            uniqueId, LOGINFO, LOGDATA);

        //let itemToPut : Island = <Island><unknown>item

        // console.log("=============> > > " + typeof itemToPut)



        if (this.db && this.db.ready()) {
            this.db.ref(`${tableName}/${uniqueId}`).set(item);

            if (this.debug) {
                console.log("================ put ======");
                console.dir(item);
                console.log("================ put ======");
            }

            return true;
        } else {
            return false;
        }
    };

    getItem = async (tableName: string, uniqueId: string) => {

        log(this.realm, this.source, "getItem",
            "table " +
            tableName +
            " id: " +
            uniqueId, LOGINFO, LOGDATA);

        if (this.db && this.db.ready()) {
            const data = await this.db.ref(`${tableName}/${uniqueId}`).get();
            if (data.exists) {
                return data.val();
            } else {
                return "no data";
            }
        } else {
            return "no this.db";
        }

    };

    getAsyncItems = async (
        tableName: string,
        filterIdx: string = "id",
        filterComparator: string = ">",
        filterVal: number = 0
    ): Promise<[]> => {

        log(this.realm, this.source, "getAsyncItems",
            "table " +
            tableName +
            " filter " +
            filterIdx +
            filterComparator +
            filterVal);

        if (this.db && this.db.ready()) {

            const snapshots = await this.db.query(tableName)
                // .take(50)
                .filter(filterIdx, filterComparator, filterVal)
                .get();

            if (this.debug) {
                console.log("================ getAsyncItems ======");
                console.dir(snapshots.getValues());
                console.log("================ getAsyncItems ======");
            }

            return snapshots.getValues();

        } else {
            return []
        }
    };

    deleteItem = (tableName: string, uniqueId: string) => {
        if (this.db && this.db.ready()) {
            this.db.ref(`${tableName}/${uniqueId}`).remove();
            return true;
        } else {
            return false;
        }
    };
}