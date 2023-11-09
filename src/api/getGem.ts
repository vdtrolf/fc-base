import Gem from "../models/gem";


export const getGem = async (dbHelper, id) : Promise<Gem> => {

  const gem : Gem = (await dbHelper.getItem("gems",id)) as unknown as Gem;
  return gem;
}