"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const namesHelper_1 = require("../../helpers/namesHelper");
const constants_1 = require("../../constants");
// Class Implementation
class Penguin {
    constructor(id, key, vpos, hpos, alive = true, age = Math.floor(Math.random() * 4), deadAge = 0, hunger = 0, temp = 0, gender = Math.floor(Math.random() * 2), genderName = "bzz", name = (0, namesHelper_1.getPersonName)(gender), shape = Math.floor(Math.random() * 3), activity = constants_1.ACTIVITY_NONE, activityTime = 0, activityTarget = constants_1.DIRECTION_NONE, targetVPos = 0, targetHPos = 0, activityVPos = 0, activityHPos = 0, activityDirection = constants_1.DIRECTION_NONE, activityText = '', // DIRECTION_NAMES[activityDirection],
    goal = constants_1.DIRECTION_NONE, hasFish = false, hasGem = false, isChild = true, isOld = false, canLove = false, inLove = false, loveTime = 0, hasShowel = false, showelCnt = 0, commands = []) {
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
        this.genderName = genderName;
        this.name = name;
        this.shape = shape;
        this.activity = activity;
        this.activityTime = activityTime;
        this.activityTarget = activityTarget;
        this.targetVPos = targetVPos;
        this.targetHPos = targetHPos;
        this.activityVPos = activityVPos;
        this.activityHPos = activityHPos;
        this.activityDirection = activityDirection;
        this.activityText = activityText;
        this.goal = goal;
        this.hasFish = hasFish;
        this.hasGem = hasGem;
        this.isChild = isChild;
        this.isOld = isOld;
        this.canLove = canLove;
        this.inLove = inLove;
        this.loveTime = loveTime;
        this.hasShowel = hasShowel;
        this.showelCnt = showelCnt;
        this.commands = commands;
    }
}
exports.default = Penguin;
// shape:penguin.figure, 
//                     vision: 2,
// targetDirections: penguin.activityTarget,
// path:"",
//# sourceMappingURL=penguin.js.map