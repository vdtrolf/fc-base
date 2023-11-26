
export const getUsersList = async (dbHelper) => { 

    const users = (await dbHelper.getAsyncItems("users")) as unknown ;
    return users;
  
  }
  