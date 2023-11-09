
export const getPenguinsList = async (dbHelper) => { 

    const penguins = (await dbHelper.getAsyncItems("penguins")) as unknown ;
    return penguins;
  
  }
  