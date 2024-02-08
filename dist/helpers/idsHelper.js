"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueKey = exports.getUniqueId = void 0;
const getUniqueId = (dbHelper, prefix) => __awaiter(void 0, void 0, void 0, function* () {
    let counter = 0;
    let foundId = 0;
    while (counter < 20) {
        let testId = Math.floor(prefix * 1000 + Math.random() * 999);
        const island = (yield dbHelper.getItem("islands", testId));
        console.dir(island);
        if (!island) {
            foundId = testId;
            break;
        }
        counter += 1;
    }
    return foundId;
});
exports.getUniqueId = getUniqueId;
const getUniqueKey = (prefix) => {
    return Math.floor(prefix * 1000000000 + Math.random() * 999999999);
};
exports.getUniqueKey = getUniqueKey;
//# sourceMappingURL=idsHelper.js.map