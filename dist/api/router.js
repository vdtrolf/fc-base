"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flashRouter = exports.setDbHelper = void 0;
// External Dependencies
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const getFishList_1 = require("./getFishList");
const getFish_1 = require("./getFish");
const createFish_1 = require("./createFish");
const getCellsList_1 = require("./getCellsList");
const getCell_1 = require("./getCell");
const createCell_1 = require("./createCell");
const getGemsList_1 = require("./getGemsList");
const getGem_1 = require("./getGem");
const createGem_1 = require("./createGem");
const getGarbagesList_1 = require("./getGarbagesList");
const getGarbage_1 = require("./getGarbage");
const createGarbage_1 = require("./createGarbage");
const getPenguinsList_1 = require("./getPenguinsList");
const getPenguin_1 = require("./getPenguin");
const createPenguin_1 = require("./createPenguin");
const getUsersList_1 = require("./getUsersList");
const getUser_1 = require("./getUser");
const createUser_1 = require("./createUser");
const getIslandsList_1 = require("./getIslandsList");
const getIsland_1 = require("./getIsland");
const createIsland_1 = require("./createIsland");
// Constants
// Set de db helper, which can be i.e. acebase or DynamoDB
let dbHelper = null;
const setDbHelper = (module) => {
    dbHelper = module;
};
exports.setDbHelper = setDbHelper;
// Global Config
exports.flashRouter = express_1.default.Router();
exports.flashRouter.use(express_1.default.json());
const path = process.env.API_PATH;
// GET FISH
exports.flashRouter.get(path + "/fishes/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fishes = (yield (0, getFishList_1.getFishesList)(dbHelper));
        res.status(200).send(fishes);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.flashRouter.get(path + "/fishes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const fish = (yield (0, getFish_1.getFish)(dbHelper, id));
        if (fish) {
            res.status(200).send(fish);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching fish with id: ${req.params.id}`);
    }
}));
// POST FISH
exports.flashRouter.post(path + "/fishes/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fish = req.body;
        const result = (0, createFish_1.createFish)(dbHelper, fish);
        result
            ? res.status(201).send(`Successfully created a new fish with id ${fish.id}`)
            : res.status(500).send("Failed to create a new fish.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
// GET CELL
exports.flashRouter.get(path + "/cells/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cells = (yield (0, getCellsList_1.getCellsList)(dbHelper));
        res.status(200).send(cells);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.flashRouter.get(path + "/cells/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    try {
        const cell = (yield (0, getCell_1.getCell)(dbHelper, id));
        if (cell) {
            res.status(200).send(cell);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching cell with id: ${req.params.id}`);
    }
}));
// POST CELL
exports.flashRouter.post(path + "/cells/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cell = req.body;
        const result = (0, createCell_1.createCell)(dbHelper, cell);
        result
            ? res.status(201).send(`Successfully created a new cell with id ${cell.id}`)
            : res.status(500).send("Failed to create a new cell.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
// GET GEM
exports.flashRouter.get(path + "/gems/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gems = (yield (0, getGemsList_1.getGemsList)(dbHelper));
        res.status(200).send(gems);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.flashRouter.get(path + "/gems/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
    try {
        const gem = (yield (0, getGem_1.getGem)(dbHelper, id));
        if (gem) {
            res.status(200).send(gem);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching gem with id: ${req.params.id}`);
    }
}));
// POST GEM
exports.flashRouter.post(path + "/gems/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gem = req.body;
        const result = (0, createGem_1.createGem)(dbHelper, gem);
        result
            ? res.status(201).send(`Successfully created a new gem with id ${gem.id}`)
            : res.status(500).send("Failed to create a new gem.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
// GET GARBAGE
exports.flashRouter.get(path + "/garbages/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const garbages = (yield (0, getGarbagesList_1.getGarbagesList)(dbHelper));
        res.status(200).send(garbages);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.flashRouter.get(path + "/garbages/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const id = (_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.id;
    try {
        const garbage = (yield (0, getGarbage_1.getGarbage)(dbHelper, id));
        if (garbage) {
            res.status(200).send(garbage);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching garbage with id: ${req.params.id}`);
    }
}));
// POST GARBAGE
exports.flashRouter.post(path + "/garbages/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const garbage = req.body;
        const result = (0, createGarbage_1.createGarbage)(dbHelper, garbage);
        result
            ? res.status(201).send(`Successfully created a new garbage with id ${garbage.id}`)
            : res.status(500).send("Failed to create a new garbage.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
// GET PENGUIN
exports.flashRouter.get(path + "/penguins/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const penguins = (yield (0, getPenguinsList_1.getPenguinsList)(dbHelper));
        res.status(200).send(penguins);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.flashRouter.get(path + "/penguins/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const id = (_e = req === null || req === void 0 ? void 0 : req.params) === null || _e === void 0 ? void 0 : _e.id;
    try {
        const penguin = (yield (0, getPenguin_1.getPenguin)(dbHelper, id));
        if (penguin) {
            res.status(200).send(penguin);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching gem with id: ${req.params.id}`);
    }
}));
// POST PENGUIN
exports.flashRouter.post(path + "/penguins/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const penguin = req.body;
        const result = (0, createPenguin_1.createPenguin)(dbHelper, penguin);
        result
            ? res.status(201).send(`Successfully created a new penguin with id ${penguin.id}`)
            : res.status(500).send("Failed to create a new penguin.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
// GET USER
exports.flashRouter.get(path + "/users/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = (yield (0, getUsersList_1.getUsersList)(dbHelper));
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.flashRouter.get(path + "/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const id = (_f = req === null || req === void 0 ? void 0 : req.params) === null || _f === void 0 ? void 0 : _f.id;
    try {
        const user = (yield (0, getUser_1.getUser)(dbHelper, id));
        if (user) {
            res.status(200).send(user);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching user with id: ${req.params.id}`);
    }
}));
// POST USER
exports.flashRouter.post(path + "/users/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const result = (0, createUser_1.createUser)(dbHelper, user);
        result
            ? res.status(201).send(`Successfully created a new user with id ${user.id}`)
            : res.status(500).send("Failed to create a new user.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
// GET ISLAND
exports.flashRouter.get(path + "/islands/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const islands = (yield (0, getIslandsList_1.getIslandsList)(dbHelper));
        res.status(200).send(islands);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.flashRouter.get(path + "/islands/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const id = (_g = req === null || req === void 0 ? void 0 : req.params) === null || _g === void 0 ? void 0 : _g.id;
    try {
        const island = (yield (0, getIsland_1.getIsland)(dbHelper, id));
        if (island) {
            res.status(200).send(island);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching island with id: ${req.params.id}`);
    }
}));
// POST ISLAND
exports.flashRouter.post(path + "/islands/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("================");
        console.log(req.body);
        console.log("================");
        const island = req.body;
        const result = (0, createIsland_1.createIsland)(dbHelper, island);
        console.log("-------------------");
        console.dir(island);
        console.log("-------------------");
        result
            ? res.status(201).send(`Successfully created a new island with id ${island.id}`)
            : res.status(500).send("Failed to create a new island.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
//# sourceMappingURL=router.js.map