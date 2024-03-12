import User from "../model/user";
import { IDBHelper } from "../../helpers/databaseHelper"

export const createUser = async (dbHelper: IDBHelper, user: User) => {
    return await dbHelper.putItem("users", { item: user }, user.id);
}