"use strict";
// External Dependencies
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
exports.paintingsRouter = void 0;
const express_1 = __importDefault(require("express"));
const acebasehelper_1 = require("./acebasehelper");
// Global Config
exports.paintingsRouter = express_1.default.Router();
exports.paintingsRouter.use(express_1.default.json());
// GET
exports.paintingsRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paintings = (yield (0, acebasehelper_1.getAsyncItems)("paintings"));
        res.status(200).send(paintings);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.paintingsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const painting = (yield (0, acebasehelper_1.getItem)("paintings", id));
        if (painting) {
            res.status(200).send(painting);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
// POST
exports.paintingsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const painting = req.body;
        // const id:string = Math.floor(Math.random() * 1000).toString();
        const result = (0, acebasehelper_1.putItem)("paintings", painting, painting.id);
        result
            ? res.status(201).send(`Successfully created a new painting with id ${painting.id}`)
            : res.status(500).send("Failed to create a new game.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
//# sourceMappingURL=router.js.map