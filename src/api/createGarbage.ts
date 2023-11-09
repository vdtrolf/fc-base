import Garbage from "../models/garbage";

export const createGarbage = (dbHelper : any, garbage : Garbage) => { 
  return dbHelper.putItem("garbages",garbage, garbage.id);
}