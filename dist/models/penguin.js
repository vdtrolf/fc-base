"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const namesHelper_1 = require("../services/namesHelper");
const constants_1 = require("../constants");
// Class Implementation
class Penguin {
    constructor(id, key, vpos, hpos, alive = true, age = Math.floor(Math.random() * 4), deadAge = 0, hunger = 0, temp = 0, gender = Math.floor(Math.random() * 2), name = (0, namesHelper_1.getPersonName)(gender), activity = constants_1.ACTIVITY_NONE, activityTime = 0, activityTarget = constants_1.DIRECTION_NONE, activityDirection = constants_1.DIRECTION_NONE, activityText = constants_1.DIRECTION_NAMES[activityDirection], goal = constants_1.DIRECTION_NONE, hasFish = false, hasGem = false) {
        this.id = id;
        this.key = key;
        this.vpos = vpos;
        this.hpos = hpos;
        this.alive = alive;
        this.age = age;
        this.deadAge = deadAge;
        this.hunger = hunger;
        this.temp = temp;
        this.gender = gender;
        this.name = name;
        this.activity = activity;
        this.activityTime = activityTime;
        this.activityTarget = activityTarget;
        this.activityDirection = activityDirection;
        this.activityText = activityText;
        this.goal = goal;
        this.hasFish = hasFish;
        this.hasGem = hasGem;
    }
}
exports.default = Penguin;
//# sourceMappingURL=penguin.js.map