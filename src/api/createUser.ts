import User from "../models/users";

export const createUser = (dbHelper : any, user : User) => { 
  return dbHelper.putItem("users",user, user.id);
}