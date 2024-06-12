import Simulation from "../data/model/simulation";
import { IDBHelper } from "../helpers/databaseHelper"

export const getUniqueId = async (dbHelper: IDBHelper, prefix: number): Promise<number> => {

    let counter = 0;
    let foundId = 0;

    while (counter < 20) {
        const testId = Math.floor(prefix * 1000 + Math.random() * 999);
        const simulation: Simulation = (await dbHelper.getItem("islands", `${testId}`)) as unknown as Simulation;
        console.dir(simulation)
        if (!simulation) {
            foundId = testId;
            break;
        }
        counter += 1;
    }

    return foundId;

}

export const getUniqueKey = (prefix: number) => {
    return Math.floor(prefix * 1000000000 + Math.random() * 999999999);
} 