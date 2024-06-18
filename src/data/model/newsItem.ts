// External dependencies
import { TOPIC_NONE } from "../../constants";

// Class Implementation
export default class NewsItem {
    constructor(
        public id: number,
        public key: number,
        public language: number,
        public content: string,
        public publicationDate: string ,
        public author: string,
        public topic: number = TOPIC_NONE,
        public refURL : string = "",
        public isActive : boolean = false) { }
}

