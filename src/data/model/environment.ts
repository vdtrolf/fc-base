// External dependencies
import Device from "./device";
import Service from "./service";
import User from "./user"

// Class Implementation
export default class Environment {
    constructor(
        public id: number,
        public key: number,
        public user: User,
        public name: string = "",
        public year: number = 2000,
        public points: number = 0,
        public devices: Device[] = [],
        public services: Service[][] = []) {

        console.log("@@@@@ environment created wikth name " + this.name)
    }
}