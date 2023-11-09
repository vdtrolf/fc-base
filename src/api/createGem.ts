import Gem from "../models/gem";

export const createGem = (dbHelper : any, gem : Gem) => { 
  return dbHelper.putItem("gems",gem, gem.id);
}