// External dependencies

// Class Implementation
export default class Site {
    constructor(
        public id: number,
        public key: number,
        public language: number,
        public user: number,
        public domain: number,
        public domains: [],
        public stories: [],
        public newsItems : []) { }
    }