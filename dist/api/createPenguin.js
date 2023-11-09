"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPenguin = void 0;
const createPenguin = (dbHelper, penguin) => {
    return dbHelper.putItem("penguins", penguin, penguin.id);
};
exports.createPenguin = createPenguin;
//# sourceMappingURL=createPenguin.js.map