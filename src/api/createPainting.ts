import Painting from "../models/paintings";

export const createPainting = (dbHelper : any, painting : Painting) => { 
  return dbHelper.putItem("paintings",painting, painting.id);
}