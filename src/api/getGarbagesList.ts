export const getGarbagesList = async (dbHelper) => { 

    const garbages = (await dbHelper.getAsyncItems("garbages")) as unknown ;
    return garbages;
  
  }