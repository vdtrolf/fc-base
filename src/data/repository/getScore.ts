import Score from "../model/score";

export const getScore = async (dbHelper, id) : Promise<Score> => {

  const score : Score = (await dbHelper.getItem("scores",id)) as unknown as Score;
  return score;
}