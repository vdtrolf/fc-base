import Name from "../model/name";
import { IDBHelper } from "../../helpers/databaseHelper"

export const createName = (dbHelper: IDBHelper, name: Name) => {
    return dbHelper.putItem("person_names", { item: name }, name.id);
}