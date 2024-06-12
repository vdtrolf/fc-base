export const getNewsItemsList = async (dbHelper) => {

    const newsItems = (await dbHelper.getAsyncItems("newsItems")) as unknown;
    return newsItems;

}
