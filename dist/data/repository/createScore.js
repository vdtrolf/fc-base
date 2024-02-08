"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScore = void 0;
const createScore = (dbHelper, score) => {
    return dbHelper.putItem("scores", score, score.id);
};
exports.createScore = createScore;
//# sourceMappingURL=createScore.js.map