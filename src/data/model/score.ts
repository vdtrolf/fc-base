// External dependencies

// Class Implementation
export default class Score {
    constructor(
        public id: number,
        public key: number,
        public userId: number,
        public score: number,
        public level: number,
        public date: string) { }
}
