import Island from "../model/island";

export const createIsland = (dbHelper : any, island : Island) => { 
  return dbHelper.putItem("islands",island, island.id);
}