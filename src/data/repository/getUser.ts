import User from "../model/user";


export const getUser = async (dbHelper, id): Promise<User> => {

    const user: User = (await dbHelper.getItem("users", id)) as unknown as User;
    return user;
}