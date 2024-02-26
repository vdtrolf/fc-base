
export const getIslandsList = async (dbHelper) => {

    const islands = (await dbHelper.getAsyncItems("islands")) as unknown;
    return islands;

}
