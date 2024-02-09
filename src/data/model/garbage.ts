// External dependencies

// Class Implementation
export default class Garbage {
    constructor(
        public id : number,
        public key : number,
        public vpos : number,
        public hpos : number,
        public kind : number = Math.floor(Math.random() * 4), 
        public isTaken : boolean = false) {}
}
