import Signature from "../models/signatures";


export const getSignature = async (dbHelper, id) : Promise<Signature> => {

  const signature : Signature = (await dbHelper.getItem("signatures",id)) as unknown as Signature;
  return signature;
}