import Language from "../model/language";

export const getLanguage = async (dbHelper, id): Promise<Language> => {

    const language: Language = (await dbHelper.getItem("languages", id)) as unknown as Language;
    return language
}