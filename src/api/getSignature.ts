import Signature from "../models/signatures";


export const getSignature = async (dbHelper, id) : Promise<Signature> => {

  const painting : Signature = (await dbHelper.getItem("signatures",id)) as unknown as Signature;
  return painting;
}