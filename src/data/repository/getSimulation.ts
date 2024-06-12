import Simulation from "../model/simulation";


export const getSimulation = async (dbHelper, id: string): Promise<Simulation> => {

    const simulation: Simulation = (await dbHelper.getItem("simulations", id)) as unknown as Simulation;
    return simulation;
}