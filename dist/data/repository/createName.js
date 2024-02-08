"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createName = void 0;
const createName = (dbHelper, name) => {
    return dbHelper.putItem("person_names", name, name.id);
};
exports.createName = createName;
//# sourceMappingURL=createName.js.map