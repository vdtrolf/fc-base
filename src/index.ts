import * as dotenv from 'dotenv' 
dotenv.config()

import express from "express";
import cors from "cors";
import { flashRouter, setDbHelper } from "./api/router";
import { setLogLevel } from "./services/logger";
import {initiateNames} from "./services/namesHelper"
import { LOGINFO } from "./constants";

setLogLevel ("db", LOGINFO)

const app = express();
app.use(cors());

const port = process.env.EXPRESSPORT; // default port to listen
const path = process.env.API_PATH; // default port to listen
const local = process.env.DB_ENVIRONMENT === "local"

console.log(">>>" + "./services/" + process.env.DBHELPER + " >>> " + port)

import ("./services/" + process.env.DBHELPER)
    .then((module) => {
        module.createDb(local)
        .then(() => {
            let namesInitiated = module.cleanDb() 

            setDbHelper(module);    
            
            if (! namesInitiated) {initiateNames()}
            
            app.use("/", flashRouter);

            app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}` + path);
            });
        })
        .catch((error: Error) => {
            console.error("Database connection failed", error);
            process.exit();
        });
    })
    .catch((error: Error) => {
        console.error("Database creation failed", error);
        process.exit();
    });;
