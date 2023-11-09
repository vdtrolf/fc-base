// External dependencies

// Class Implementation
export default class Penguin {
    constructor(
        public id: number,
        public key: number,
        public vpos: number,
        public hpos: number,
        public alive: boolean,
        public age: number,
        public deadAge: number,
        public hunger: number,
        public temp: number,
        public gender: string,
        public name: string, 
        public activity: number,
        public activityTime : number, 
        public activityTarget : number, 
        public activityDirection: number,
        public activityText: string,
        public goal: number,
        public hasFish: boolean,
        public hasGem: boolean) {}
}
