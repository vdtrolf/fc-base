import Cardset from "../models/cardsets";


export const getCardset = async (dbHelper, id) : Promise<Cardset> => {

  const cardset : Cardset = (await dbHelper.getItem("cardsets",id)) as unknown as Cardset;
  return cardset;
}