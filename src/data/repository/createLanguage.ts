import Language from "../model/language";
import { IDBHelper } from "../../helpers/databaseHelper"

export const createLanguage = (dbHelper: IDBHelper, language: Language) => {
    return dbHelper.putItem("languages", { item: language }, language.id);
}