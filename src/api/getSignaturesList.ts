
export const getSignaturesList = async (dbHelper) => { 

  const signatures = (await dbHelper.getAsyncItems("signatures")) as unknown ;
  return signatures;

}
