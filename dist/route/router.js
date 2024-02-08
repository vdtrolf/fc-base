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
const getNamesList_1 = require("../data/repository/getNamesList");
const getName_1 = require("../data/repository/getName");
const createName_1 = require("../data/repository/createName");
const getScoresList_1 = require("../data/repository/getScoresList");
const getScore_1 = require("../data/repository/getScore");
const createScore_1 = require("../data/repository/createScore");
const getUsersList_1 = require("../data/repository/getUsersList");
const getUser_1 = require("../data/repository/getUser");
const createUser_1 = require("../data/repository/createUser");
const island_1 = __importDefault(require("../data/model/island"));
const getIslandsList_1 = require("../data/repository/getIslandsList");
const getIsland_1 = require("../data/repository/getIsland");
const createIsland_1 = require("../data/repository/createIsland");
const idsHelper_1 = require("../helpers/idsHelper");
// Constants
const constants_1 = require("../constants");
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
// GET NAME
exports.flashRouter.get(path + "/create", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uniqueId = yield (0, idsHelper_1.getUniqueId)(dbHelper, constants_1.PREFIX_ISLAND);
        const uniqueKey = (0, idsHelper_1.getUniqueKey)(constants_1.PREFIX_ISLAND);
        const island = new island_1.default(uniqueId, uniqueKey);
        dbHelper.putItem("islands", island, island.id);
        res.status(200).send(island);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET NAME
exports.flashRouter.get(path + "/names/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const names = (yield (0, getNamesList_1.getNamesList)(dbHelper));
        res.status(200).send(names);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.flashRouter.get(path + "/names/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const name = (yield (0, getName_1.getName)(dbHelper, id));
        if (name) {
            res.status(200).send(name);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching name with id: ${req.params.id}`);
    }
}));
// POST NAME
exports.flashRouter.post(path + "/names/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body;
        const result = (0, createName_1.createName)(dbHelper, name);
        result
            ? res.status(201).send(`Successfully created a new name with id ${name.id}`)
            : res.status(500).send("Failed to create a new name.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
// GET SCORE
exports.flashRouter.get(path + "/scores/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scores = (yield (0, getScoresList_1.getScoresList)(dbHelper));
        res.status(200).send(scores);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.flashRouter.get(path + "/scores/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    try {
        const score = (yield (0, getScore_1.getScore)(dbHelper, id));
        if (score) {
            res.status(200).send(score);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching score with id: ${req.params.id}`);
    }
}));
// POST SCORE
exports.flashRouter.post(path + "/scores/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const score = req.body;
        const result = (0, createScore_1.createScore)(dbHelper, score);
        result
            ? res.status(201).send(`Successfully created a new score with id ${score.id}`)
            : res.status(500).send("Failed to create a new score.");
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
    var _c;
    const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
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
    var _d;
    const id = (_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.id;
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
// CREATR ISLAND (POST)
exports.flashRouter.post(path + "/islands/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const island = req.body;
        const result = (0, createIsland_1.createIsland)(dbHelper, island);
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