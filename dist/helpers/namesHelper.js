"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIslandName = exports.getPersonName = exports.initiateNames = void 0;
const initiateNames = () => {
};
exports.initiateNames = initiateNames;
const getPersonName = (gender) => {
    let name = gender === 0 ? "toto" : "tata";
    return name;
};
exports.getPersonName = getPersonName;
const getIslandName = () => {
    let name = "Ouessant";
    return name;
};
exports.getIslandName = getIslandName;
//# sourceMappingURL=namesHelper.js.map