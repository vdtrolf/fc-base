import Domain from "../model/domain";
import { IDBHelper } from "../../helpers/databaseHelper"

export const createDomain = async (dbHelper: IDBHelper, domain: Domain) => {
    return await dbHelper.putItem("domains", { item: domain }, domain.id);
}