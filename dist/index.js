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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = require("./api/router");
const logger_1 = require("./services/logger");
const namesHelper_1 = require("./services/namesHelper");
const constants_1 = require("./constants");
(0, logger_1.setLogLevel)("db", constants_1.LOGINFO);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.EXPRESSPORT; // default port to listen
const path = process.env.API_PATH; // default port to listen
const local = process.env.DB_ENVIRONMENT === "local";
console.log(">>>" + "./models/" + process.env.DBHELPER + " >>> " + port);
(_a = "./models/" + process.env.DBHELPER, Promise.resolve().then(() => __importStar(require(_a)))).then((module) => {
    module.createDb(local)
        .then(() => {
        let namesInitiated = module.cleanDb();
        (0, router_1.setDbHelper)(module);
        if (!namesInitiated) {
            (0, namesHelper_1.initiateNames)();
        }
        app.use("/", router_1.flashRouter);
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}` + path);
        });
    })
        .catch((error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
})
    .catch((error) => {
    console.error("Database creation failed", error);
    process.exit();
});
;
//# sourceMappingURL=index.js.map