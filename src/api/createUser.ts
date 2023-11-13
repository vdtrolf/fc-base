import User from "../models/users";

export const createUser = async (dbHelper : any, user : User) => { 
  return await dbHelper.putItem("users",user, user.id);
}