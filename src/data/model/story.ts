// External dependencies
import { TOPIC_NONE } from "../../constants";

// Class Implementation
export default class Story {
    constructor(
        public id: number,
        public key: number,
        public language: number,
        public content: string,
        public publicationDate: string ,
        public author: string,
        public topic: string,
        public refURL : string ,
        public isActive : boolean = false) { }
}

