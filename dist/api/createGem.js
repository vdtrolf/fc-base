"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGem = void 0;
const createGem = (dbHelper, gem) => {
    return dbHelper.putItem("gems", gem, gem.id);
};
exports.createGem = createGem;
//# sourceMappingURL=createGem.js.map