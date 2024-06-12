import Simulation from "../data/model/simulation";
import User from "../data/model/user";
import {PREFIX_SIMULATION} from "../constants";

import { getUniqueId, getUniqueKey } from '../helpers/idsHelper';

export const buildSimulation = async (dbHelper ,user: User) => {

    const uniqueId = await getUniqueId(dbHelper, PREFIX_SIMULATION)
    const uniqueKey = getUniqueKey(PREFIX_SIMULATION)

    const simulation = new Simulation(uniqueId, uniqueKey, user);

    dbHelper.putItem("simulations", simulation, simulation.id);
    return simulation

}
