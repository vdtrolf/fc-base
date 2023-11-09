import Garbage from "../models/garbage";

export const getGarbage = async (dbHelper, id) : Promise<Garbage> => {

  const garbage : Garbage = (await dbHelper.getItem("garbages",id)) as unknown as Garbage;
  return garbage;
}