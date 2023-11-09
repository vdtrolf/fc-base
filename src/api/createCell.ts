import Cell from "../models/cell";

export const createCell = (dbHelper : any, cell : Cell) => { 
  return dbHelper.putItem("cells",cell, cell.id);
}