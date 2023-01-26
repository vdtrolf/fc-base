import Cardset from "../models/cardsets";

export const createCardset = (dbHelper : any, cardset : Cardset) => { 
  return dbHelper.putItem("cardsets",cardset, cardset.id);
}