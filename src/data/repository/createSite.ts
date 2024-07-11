import Site from "../model/site";
import { IDBHelper } from "../../helpers/databaseHelper"

export const createSite = (dbHelper: IDBHelper, site: Site) => {
    return dbHelper.putItem("sites", { item: site }, site.id);
}