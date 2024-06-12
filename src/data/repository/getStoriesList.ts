export const getStoriesList = async (dbHelper) => {

    const stories = (await dbHelper.getAsyncItems("stories")) as unknown;
    return stories;

}
