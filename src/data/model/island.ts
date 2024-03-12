// External dependencies
import Gem from "./gem";
import Garbage from "./garbage";
import Fish from "./fish";
import Penguin from "./penguin";
import Cell from "./cell";
import { islandExtract } from "./itemInterface";

import { getIslandName } from "../../helpers/namesHelper"
import { BOARDSIZE } from "../../constants";

// Class Implementation
export default class Island {
    constructor(
        public id: number,
        public key: number,
        public size: number = BOARDSIZE,
        public difficulty: number = 2,
        public name: string = getIslandName(),
        public counter: number = 0,
        public weather: number = Math.floor(Math.random() * 4),
        public weatherAge: number = 0,
        public year: number = 2000,
        public points: number = 0,
        public platicControl: boolean = false,
        public running: boolean = true,
        public evolutionSpeed: number = 1,
        public onGoing: boolean = true,
        public penguins: Penguin[] = [],
        public fishes: Fish[] = [],
        public gems: Gem[] = [],
        public garbages: Garbage[] = [],
        public cells: Cell[][] = [],
        public islands: islandExtract[] = []) {

        console.log("@@@@@ island created wikth name " + this.name)
    }
}