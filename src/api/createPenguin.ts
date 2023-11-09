import Penguin from "../models/penguin";

export const createPenguin = (dbHelper : any, penguin : Penguin) => { 
  return dbHelper.putItem("penguins",penguin, penguin.id);
}