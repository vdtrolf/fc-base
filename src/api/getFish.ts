import Fish from "../models/fish";


export const getFish = async (dbHelper, id) : Promise<Fish> => {

  const fish : Fish = (await dbHelper.getItem("fishes",id)) as unknown as Fish;
  return fish;
}