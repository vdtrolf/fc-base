
export const getGemsList = async (dbHelper) => { 

  const gems = (await dbHelper.getAsyncItems("gems")) as unknown ;
  return gems;

}
