import express from "express";
import cors from "cors";
import { createDb } from "./acebasehelper"
import { paintingsRouter } from "./router";

const app = express();
app.use(cors());
const port = 8080; // default port to listen

createDb()
    .then(() => {
        app.use("/paintings", paintingsRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });