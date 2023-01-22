
export const getSignaturesList = async (dbHelper) => { 

  const paintings = (await dbHelper.getAsyncItems("signatures")) as unknown ;
  return paintings;

}
