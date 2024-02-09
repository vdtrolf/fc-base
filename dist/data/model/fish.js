"use strict";
// External dependencies
Object.defineProperty(exports, "__esModule", { value: true });
// Class Implementation
class Fish {
    constructor(id, key, vpos, hpos, onHook = false, isTaken = false) {
        this.id = id;
        this.key = key;
        this.vpos = vpos;
        this.hpos = hpos;
        this.onHook = onHook;
        this.isTaken = isTaken;
    }
}
exports.default = Fish;
//# sourceMappingURL=fish.js.map