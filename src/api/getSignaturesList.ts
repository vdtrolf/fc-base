
export const getList = async (dbHelper) => { 

  const paintings = (await dbHelper.getAsyncItems("signatures")) as unknown ;
  return paintings;

}
