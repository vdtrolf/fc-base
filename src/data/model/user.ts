// External dependencies

// Class Implementation
export default class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public role: number,
        public creationDate: string) { }
}