import Painting from "../models/paintings";


export const getPainting = async (dbHelper, id) : Promise<Painting> => {

  const painting : Painting = (await dbHelper.getItem("paintings",id)) as unknown as Painting;
  return painting;
}