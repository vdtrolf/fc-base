import { IDBHelper } from "../../helpers/databaseHelper"
import Simulation from "../model/simulation";

export const createSimulation = (dbHelper: IDBHelper, simulation: Simulation) => {
    return dbHelper.putItem("simulation", { item: simulation }, simulation.id);
}