import { AceBase } from "acebase";
import { log } from "./logger"
import { LOGVERB, LOGINFO, LOGERR, LOGDATA } from "../constants"

const realm = "db";
const source = "acebasehelper.js";


let db = null;
const debug = false;

export const createDb = async (local:boolean) => {
  if (db === null) {
    const options = { logLevel: "err" }; //   'verbose'};
    db = new AceBase("my_db");
  }
};

export const cleanDb = () => {
  if (db && db.ready()) {
    db.query("island").take(1000).remove();
  }
};

export const putItem = (tableName:string, Item:any, uniqueId: string) => {
  
  log(realm, source, "putItem", 
          "table " +
          tableName +
          " id: " +
          uniqueId,LOGINFO, LOGDATA);
  
  if (db && db.ready()) {
    db.ref(`${tableName}/${uniqueId}`).set(Item);
    
    console.log("================ put ======");
    console.dir(Item);
    console.log("================ put ======");

    return true;
  } else {
    return false;
  }
};

export const getItem = async (tableName:string, uniqueId:string) => {

  log(realm, source, "getItem", 
          "table " +
          tableName +
          " id: " +
          uniqueId,LOGINFO, LOGDATA);

  if (db && db.ready()) {
    const data = await db.ref(`${tableName}/${uniqueId}`).get();
    if (data.exists) {
      return data.val();
    } else {  
      return "no data";
    }
  } else {
    return "no db";
  }

};

export const getAsyncItems = async (
    tableName:string,
    filterIdx:string = "id",
    filterComparator:string = ">",
    filterVal:number = 0
  ) => {

  log(realm, source, "getAsyncItems", 
        "table " +
        tableName +
        " filter " +
        filterIdx +
        filterComparator +
        filterVal);

  if (db && db.ready()) {

    const snapshots = await db.query(tableName)
      // .take(50)
      .filter(filterIdx, filterComparator, filterVal)
      .get();
      
      console.log("================ getAsyncItems ======");
      console.dir(snapshots.getValues());
      console.log("================ getAsyncItems ======");

    return snapshots.getValues();

  } else {
    return "no db"
  }
};
  
export const deleteItem = (tableName:string, uniqueId:string) => {
  if (db && db.ready()) {
    db.ref(`${tableName}/${uniqueId}`).remove();
    return true;
  } else {
    return false;
  }
};