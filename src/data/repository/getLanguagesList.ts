export const getLanguagesList = async (dbHelper) => {

    const languages = (await dbHelper.getAsyncItems("languages")) as unknown;
    return languages;

}
