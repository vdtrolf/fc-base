
export const getCellsList = async (dbHelper) => { 

    const cells = (await dbHelper.getAsyncItems("cells")) as unknown ;
    return cells;
  
  }