import Score from "../model/score";

export const createScore = (dbHelper : any, score : Score) => { 
  return dbHelper.putItem("scores",score, score.id);
}