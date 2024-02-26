// External dependencies
import { getPersonName } from "../../helpers/namesHelper"
import { ACTIVITY_NONE, DIRECTION_NONE } from "../../constants";

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
        public genderName: string = "bzz",
        public name: string = getPersonName(gender),
        public shape: number = Math.floor(Math.random() * 3),
        public activity: number = ACTIVITY_NONE,
        public activityTime: number = 0,
        public activityTarget: number = DIRECTION_NONE,
        public targetVPos: number = 0,
        public targetHPos: number = 0,
        public activityVPos: number = 0,
        public activityHPos: number = 0,
        public activityDirection: number = DIRECTION_NONE,
        public activityText: string = '', // DIRECTION_NAMES[activityDirection],
        public goal: number = DIRECTION_NONE,
        public hasFish: boolean = false,
        public hasGem: boolean = false,
        public isChild: boolean = true,
        public isOld: boolean = false,
        public canLove: boolean = false,
        public inLove: boolean = false,
        public loveTime: number = 0,
        public hasShowel: boolean = false,
        public showelCnt: number = 0,
        public commands: string[] = []) {
    }
}

// shape:penguin.figure,
//                     vision: 2,
// targetDirections: penguin.activityTarget,
// path:"",
