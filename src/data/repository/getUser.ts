import User from "../model/users";


export const getUser = async (dbHelper, id) : Promise<User> => {

  const user : User = (await dbHelper.getItem("users",id)) as unknown as User;
  return user;
}