// @ts-no-check

import * as dotenv from 'dotenv'
dotenv.config()

import express from "express";
import cors from "cors";
import { flashRouter, setDbHelper } from "./route/router";
import { setLogLevel } from "./helpers/logger";
import { LOGINFO } from "./constants";
import { AcebaseDBHelper } from "./helpers/acebaseHelper"
import { IDBHelper } from "./helpers/databaseHelper"

setLogLevel("db", LOGINFO)

const app = express();
app.use(cors());

const port : string = process.env.EXPRESSPORT; // default port to listen
const path = process.env.API_PATH; // default port to listen
const local = process.env.DB_SIMULATION === "local"
const DB: IDBHelper = process.env.DBHELPER === "acebaseHelper" ? new AcebaseDBHelper(local) : null;

// console.log(">>>" + "./services/" + process.env.DBHELPER + " >>> " + port)

console.dir(DB)


if (DB) {

    DB.createDb(local)
        .then(() => {
            // const namesInitiated = DB.cleanDb()

            setDbHelper(DB);

            app.use("/", flashRouter);

            app.listen(port, () => {
                console.log(`Server started at http://localhost:${port}` + path);
            });
        })
        .catch((error: Error) => {
            console.error("Database connection failed", error);
            process.exit();
        });
}

