// External dependencies

// Class Implementation
export default class Fish {
    constructor(
        public id : number,
        public key : number,
        public vpos : number, 
        public hpos : number, 
        public onHook : boolean,
        public isDead : boolean,
        public direction : number) {}
}
