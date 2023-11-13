// External dependencies
import Gem from "./score";
import Garbage from "./garbage";
import Fish from "./fish";
import Penguin from "./penguin";
import Cell from "./name";

import { setLogLevel } from "../services/logger";
import { getIslandName } from "../services/namesHelper"
import { getUniqueId,getUniqueKey } from '../services/idsHelper';
import { LOGINFO, BOARDSIZE, PREFIX_PENGUIN } from "../constants";


// Class Implementation
export default class Island {
    constructor(
        public id : number,
        public key : number,
        public size : number = BOARDSIZE,
        public name : string = getIslandName(),
        public counter : number = 0,
        public weather : number = Math.floor(Math.random() * 4),
        public evolutionSpeed : number = 1,
        public onGoing : boolean = true,
        public penguins : Penguin[] = [],
        public fishes : Fish[] = [],
        public gems : Gem[] = [],
        public garbages : Garbage[] = [],
        public cells : Cell[] = [] ) {
          
            const uniqueKey = getUniqueKey(PREFIX_PENGUIN)

            this.penguins.push(new Penguin(1,uniqueKey,2,3));

            console.log("@@@@@ island created wikth name " + this.name)
        }
}

