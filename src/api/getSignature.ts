import Painting from "../models/signatures";


export const getSignature = async (dbHelper, id) : Promise<Painting> => {

  const painting : Painting = (await dbHelper.getItem("signatures",id)) as unknown as Painting;
  return painting;
}