
export const getCardsetsList = async (dbHelper) => { 

  const cardsets = (await dbHelper.getAsyncItems("cardsets")) as unknown ;
  return cardsets;

}
