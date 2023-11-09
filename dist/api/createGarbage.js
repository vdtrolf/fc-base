"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGarbage = void 0;
const createGarbage = (dbHelper, garbage) => {
    return dbHelper.putItem("garbages", garbage, garbage.id);
};
exports.createGarbage = createGarbage;
//# sourceMappingURL=createGarbage.js.map