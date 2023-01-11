import Signature from "../models/signatures";

export const createSignature = (dbHelper : any, signature : Signature) => { 
  return dbHelper.putItem("signatures",signature, signature.id);
}