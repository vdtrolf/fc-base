"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIsland = void 0;
const createIsland = (dbHelper, island) => {
    return dbHelper.putItem("islands", island, island.id);
};
exports.createIsland = createIsland;
//# sourceMappingURL=createIsland.js.map