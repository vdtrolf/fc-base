// External dependencies

// Class Implementation
export default class Device {
    constructor(
        public id: number,
        public key: number,
        public vpos: number,
        public hpos: number,
        public isSecondHand: boolean = false) { }
}
