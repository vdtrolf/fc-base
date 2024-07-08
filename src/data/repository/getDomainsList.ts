export const getDomainsList = async (dbHelper) => {

    const domains = (await dbHelper.getAsyncItems("domains")) as unknown;
    return domains;

}
