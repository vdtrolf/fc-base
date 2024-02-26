// External dependencies

// Class Implementation
export default class Gem {
    constructor(
        public id: number,
        public key: number,
        public vpos: number,
        public hpos: number,
        public hasShowel: boolean,
        public age: number = 12,
        public isTaken: boolean = false) { }
}
