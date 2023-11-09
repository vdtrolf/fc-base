import Fish from "../models/fish";

export const createFish = (dbHelper : any, fish : Fish) => { 
  return dbHelper.putItem("fishes",fish, fish.id);
}