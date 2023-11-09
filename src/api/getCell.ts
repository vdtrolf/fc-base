import Cell from "../models/cell";


export const getCell = async (dbHelper, id) : Promise<Cell> => {

  const cell : Cell = (await dbHelper.getItem("cells",id)) as unknown as Cell;
  return cell;
}