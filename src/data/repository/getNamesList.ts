
export const getNamesList = async (dbHelper) => {

    const names = (await dbHelper.getAsyncItems("names")) as unknown;
    return names;

}