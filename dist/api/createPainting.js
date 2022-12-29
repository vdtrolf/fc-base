"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPainting = void 0;
const createPainting = (dbHelper, painting) => {
    return dbHelper.putItem("paintings", painting, painting.id);
};
exports.createPainting = createPainting;
//# sourceMappingURL=createPainting.js.map