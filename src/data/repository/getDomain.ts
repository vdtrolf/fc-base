import Domain from "../model/domain";

export const getDomain = async (dbHelper, id): Promise<Domain> => {

    const domain: Domain = (await dbHelper.getItem("domains", id)) as unknown as Domain;
    return domain;
}