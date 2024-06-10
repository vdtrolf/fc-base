import Environment from "../data/model/environment";
import User from "../data/model/user";
import {PREFIX_ENVIRONMENT} from "../constants";

import { getUniqueId, getUniqueKey } from '../helpers/idsHelper';

export const buildEnvironment = async (dbHelper ,user: User) => {

    const uniqueId = await getUniqueId(dbHelper, PREFIX_ENVIRONMENT)
    const uniqueKey = getUniqueKey(PREFIX_ENVIRONMENT)

    const environment = new Environment(uniqueId, uniqueKey, user);

    dbHelper.putItem("environments", environment, environment.id);
    return environment

}
