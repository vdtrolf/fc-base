import Environment from "../model/environment";


export const getEnvironment = async (dbHelper, id: string): Promise<Environment> => {

    const environment: Environment = (await dbHelper.getItem("environments", id)) as unknown as Environment;
    return environment;
}