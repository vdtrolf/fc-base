import { IDBHelper } from "../../helpers/databaseHelper"
import Island from "../model/island";

export const createIsland = (dbHelper: IDBHelper, island: Island) => {
    return dbHelper.putItem("islands", { item: island }, island.id);
}