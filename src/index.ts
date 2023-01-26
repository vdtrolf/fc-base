import * as dotenv from 'dotenv' 
dotenv.config()

import express from "express";
import cors from "cors";
import { flashRouter, setDbHelper } from "./api/router";
import { LOGINFO, setLogLevel } from "./services/logger";

setLogLevel ("db", LOGINFO)

const app = express();
app.use(cors());
const port = process.env.EXPRESSPORT; // default port to listen

// console.log(">>>" + process.env.EXPRESSURL + " >>> " + port)

import ("./models/" + process.env.DBHELPER)
    .then((module) => {
        module.createDb()
        .then(() => {
            setDbHelper(module);    
            app.use("/", flashRouter);

            app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
            });
        })
        .catch((error: Error) => {
            console.error("Database connection failed", error);
            process.exit();
        });
    });