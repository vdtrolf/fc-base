"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const createUser = (dbHelper, user) => {
    return dbHelper.putItem("users", user, user.id);
};
exports.createUser = createUser;
//# sourceMappingURL=createUser.js.map