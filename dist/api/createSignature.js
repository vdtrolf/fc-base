"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSignature = void 0;
const createSignature = (dbHelper, signature) => {
    return dbHelper.putItem("signatures", signature, signature.id);
};
exports.createSignature = createSignature;
//# sourceMappingURL=createSignature.js.map