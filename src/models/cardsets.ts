// External dependencies
import Card from "./cards";
// Class Implementation
export default class Cardset {
    constructor(
        public id : number,
        public name : string, 
        public description : string, 
        public amountOfCards : number,
        public creationDate: string,
        public cards : Card[]) {}
}