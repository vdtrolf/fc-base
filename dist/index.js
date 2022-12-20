"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const acebasehelper_1 = require("./acebasehelper");
const router_1 = require("./router");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 8080; // default port to listen
(0, acebasehelper_1.createDb)()
    .then(() => {
    app.use("/paintings", router_1.paintingsRouter);
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
//# sourceMappingURL=index.js.map