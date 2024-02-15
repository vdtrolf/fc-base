"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// External dependencies
const constants_1 = require("../../constants");
// Class Implementation
class Fish {
    constructor(id, key, vpos, hpos, alive = true, onHook = false, staying = false, direction = constants_1.DIRECTION_NONE, lastDirection = constants_1.DIRECTION_NONE) {
        this.id = id;
        this.key = key;
        this.vpos = vpos;
        this.hpos = hpos;
        this.alive = alive;
        this.onHook = onHook;
        this.staying = staying;
        this.direction = direction;
        this.lastDirection = lastDirection;
    }
}
exports.default = Fish;
//# sourceMappingURL=fish.js.map