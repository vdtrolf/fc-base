
export const getList = async (dbHelper) => { 

  const paintings = (await dbHelper.getAsyncItems("paintings")) as unknown ;
  return paintings;

}
