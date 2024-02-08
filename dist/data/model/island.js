"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const penguin_1 = __importDefault(require("./penguin"));
const namesHelper_1 = require("../../helpers/namesHelper");
const idsHelper_1 = require("../../helpers/idsHelper");
const constants_1 = require("../../constants");
// Class Implementation
class Island {
    constructor(id, key, size = constants_1.BOARDSIZE, name = (0, namesHelper_1.getIslandName)(), counter = 0, weather = Math.floor(Math.random() * 4), evolutionSpeed = 1, onGoing = true, penguins = [], fishes = [], gems = [], garbages = [], cells = []) {
        this.id = id;
        this.key = key;
        this.size = size;
        this.name = name;
        this.counter = counter;
        this.weather = weather;
        this.evolutionSpeed = evolutionSpeed;
        this.onGoing = onGoing;
        this.penguins = penguins;
        this.fishes = fishes;
        this.gems = gems;
        this.garbages = garbages;
        this.cells = cells;
        const uniqueKey = (0, idsHelper_1.getUniqueKey)(constants_1.PREFIX_PENGUIN);
        this.penguins.push(new penguin_1.default(1, uniqueKey, 2, 3));
        console.log("@@@@@ island created wikth name " + this.name);
    }
}
exports.default = Island;
//# sourceMappingURL=island.js.map