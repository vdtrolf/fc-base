// External dependencies

// Class Implementation
export default class Cell {
    constructor(
        public id : number,
        public key : number,
        public vpos : number,
        public hpos : number,
        public cellType : number, 
        public angle : number) {}
}
