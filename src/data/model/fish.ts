// External dependencies

// Class Implementation
export default class Fish {
    constructor(
        public id : number,
        public key : number,
        public vpos : number,
        public hpos : number,
        public onHook : boolean = false, 
        public isTaken : boolean = false) {}
}