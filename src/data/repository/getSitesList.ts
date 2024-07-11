export const getSitesList = async (dbHelper) => {

    const sites = (await dbHelper.getAsyncItems("sites")) as unknown;
    return sites;

}
