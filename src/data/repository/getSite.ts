import Site from "../model/site";

export const getSite = async (dbHelper, id): Promise<Site> => {

    const site: Site = (await dbHelper.getItem("sites", id)) as unknown as Site;
    return site;
}