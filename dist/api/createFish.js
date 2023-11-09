"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFish = void 0;
const createFish = (dbHelper, fish) => {
    return dbHelper.putItem("fishes", fish, fish.id);
};
exports.createFish = createFish;
//# sourceMappingURL=createFish.js.map