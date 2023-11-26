import Name from "../model/name";

export const createName = (dbHelper : any, name : Name) => { 
  return dbHelper.putItem("person_names",name, name.id);
}