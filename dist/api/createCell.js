"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCell = void 0;
const createCell = (dbHelper, cell) => {
    return dbHelper.putItem("cells", cell, cell.id);
};
exports.createCell = createCell;
//# sourceMappingURL=createCell.js.map