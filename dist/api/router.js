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
const getSignaturesList_1 = require("./getSignaturesList");
const getSignature_1 = require("./getSignature");
const createSignature_1 = require("./createSignature");
const getUsersList_1 = require("./getUsersList");
const getUser_1 = require("./getUser");
const createUser_1 = require("./createUser");
const getCardsetsList_1 = require("./getCardsetsList");
const getCardset_1 = require("./getCardset");
const createCardset_1 = require("./createCardset");
// Set de db helper, which can be i.e. acebase or MondoDB
let dbHelper = null;
const setDbHelper = (module) => {
    dbHelper = module;
};
exports.setDbHelper = setDbHelper;
// Global Config
exports.flashRouter = express_1.default.Router();
exports.flashRouter.use(express_1.default.json());
// GET SIGNATURE
exports.flashRouter.get("/flash/signatures/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paintings = (yield (0, getSignaturesList_1.getSignaturesList)(dbHelper));
        res.status(200).send(paintings);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.flashRouter.get("/flash/signatures/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const painting = (yield (0, getSignature_1.getSignature)(dbHelper, id));
        if (painting) {
            res.status(200).send(painting);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching signature with id: ${req.params.id}`);
    }
}));
// POST SIGNATURE
exports.flashRouter.post("/flash/signatures/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signature = req.body;
        const result = (0, createSignature_1.createSignature)(dbHelper, signature);
        result
            ? res.status(201).send(`Successfully created a new signature with id ${signature.id}`)
            : res.status(500).send("Failed to create a new signature.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
// GET USER
exports.flashRouter.get("/flash/users/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = (yield (0, getUsersList_1.getUsersList)(dbHelper));
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.flashRouter.get("/flash/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
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
exports.flashRouter.post("/flash/users/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
// GET CARDSET
exports.flashRouter.get("/flash/cardsets/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cardsets = (yield (0, getCardsetsList_1.getCardsetsList)(dbHelper));
        res.status(200).send(cardsets);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.flashRouter.get("/flash/cardsets/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
    try {
        const cardset = (yield (0, getCardset_1.getCardset)(dbHelper, id));
        if (cardset) {
            res.status(200).send(cardset);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching cardset with id: ${req.params.id}`);
    }
}));
// POST CARDSET
exports.flashRouter.post("/flash/cardsets/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cardset = req.body;
        const result = (0, createCardset_1.createCardset)(dbHelper, cardset);
        result
            ? res.status(201).send(`Successfully created a new cardset with id ${cardset.id}`)
            : res.status(500).send("Failed to create a new cardset.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
//# sourceMappingURL=router.js.map