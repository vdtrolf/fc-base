
export const getEnvironmentsList = async (dbHelper) => {

    const environments = (await dbHelper.getAsyncItems("environments")) as unknown;
    return environments;

}
