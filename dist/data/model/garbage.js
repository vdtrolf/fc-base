"use strict";
// External dependencies
Object.defineProperty(exports, "__esModule", { value: true });
// Class Implementation
class Garbage {
    constructor(id, key, vpos, hpos, kind = Math.floor(Math.random() * 4), isTaken = false) {
        this.id = id;
        this.key = key;
        this.vpos = vpos;
        this.hpos = hpos;
        this.kind = kind;
        this.isTaken = isTaken;
    }
}
exports.default = Garbage;
//# sourceMappingURL=garbage.js.map