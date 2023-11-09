import Penguin from "../models/penguin";


export const getPenguin = async (dbHelper, id) : Promise<Penguin> => {

  const penguin : Penguin = (await dbHelper.getItem("penguins",id)) as unknown as Penguin;
  return penguin;
}