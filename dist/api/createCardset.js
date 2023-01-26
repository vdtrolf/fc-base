"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCardset = void 0;
const createCardset = (dbHelper, cardset) => {
    return dbHelper.putItem("cardsets", cardset, cardset.id);
};
exports.createCardset = createCardset;
//# sourceMappingURL=createCardset.js.map