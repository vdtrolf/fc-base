
export const getFishesList = async (dbHelper) => { 

  const fishes = (await dbHelper.getAsyncItems("fishes")) as unknown ;
  return fishes;

}
