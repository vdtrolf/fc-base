// External dependencies

// Class Implementation
export default class Cell {
    constructor(
        public id: number,
        public vpos: number,
        public hpos: number,
        public type: number,
        public beingBuilt: boolean = false) { }

    isGround = () => {
        return this.type > 0
    }

    isSea = () => {
        return this.type === 0
    }
}
