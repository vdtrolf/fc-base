import { IDBHelper } from "../../helpers/databaseHelper"
import Environment from "../model/environment";

export const createEnvironment = (dbHelper: IDBHelper, environment: Environment) => {
    return dbHelper.putItem("environment", { item: environment }, environment.id);
}