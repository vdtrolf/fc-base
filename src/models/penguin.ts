// External dependencies
import { setLogLevel } from "../services/logger";
import { getPersonName } from "../services/namesHelper"
import { LOGINFO, ACTIVITY_NONE, DIRECTION_NONE, DIRECTION_NAMES} from "../constants";

// Class Implementation
export default class Penguin {
    constructor(
        public id: number,
        public key: number,
        public vpos: number,
        public hpos: number,
        public alive: boolean = true,
        public age: number = Math.floor(Math.random() * 4),
        public deadAge: number = 0,
        public hunger: number = 0,
        public temp: number = 0,
        public gender: number = Math.floor(Math.random() * 2),
        public name: string = getPersonName(gender), 
        public activity: number = ACTIVITY_NONE,
        public activityTime : number = 0, 
        public activityTarget : number = DIRECTION_NONE, 
        public activityDirection: number = DIRECTION_NONE,
        public activityText: string = DIRECTION_NAMES[activityDirection],
        public goal: number = DIRECTION_NONE,
        public hasFish: boolean = false,
        public hasGem: boolean = false) {

        }

}
