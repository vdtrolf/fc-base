// External dependencies
import { DIRECTION_NONE } from "../../constants";

// Class Implementation
export default class Fish {
    constructor(
        public id: number,
        public key: number,
        public vpos: number,
        public hpos: number,
        public alive: boolean = true,
        public onHook: boolean = false,
        public staying: boolean = false,
        public direction: number = DIRECTION_NONE,
        public lastDirection: number = DIRECTION_NONE) { }
}

