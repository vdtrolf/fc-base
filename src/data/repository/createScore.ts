import Score from "../model/score";
import { IDBHelper } from "../../helpers/databaseHelper"

export const createScore = (dbHelper: IDBHelper, score: Score) => {
    return dbHelper.putItem("scores", { item: score }, score.id);
}