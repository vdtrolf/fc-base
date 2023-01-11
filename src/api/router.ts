// External Dependencies
import * as dotenv from 'dotenv' 
dotenv.config()

import express, { Request, Response } from "express";
import Signature from "../models/signatures";
import {getList} from "./getSignaturesList"
import {getSignature} from "./getSignature"
import {createSignature} from "./createSignature"

// Set de db helper, which can be i.e. acebase or MondoDB

let dbHelper : any = null;

export const setDbHelper = (module) => {
    dbHelper = module;
}

// Global Config

export const signaturesRouter = express.Router();
signaturesRouter.use(express.json());

// GET

signaturesRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const paintings = (await getList(dbHelper));

        res.status(200).send(paintings);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

signaturesRouter.get("/:id", async (req: Request, res: Response) => {
    const id:string = req?.params?.id;
    try {
        const painting : Signature = (await getSignature(dbHelper,id));

        if (painting) {
            res.status(200).send(painting);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST

signaturesRouter.post("/", async (req: Request, res: Response) => {
    
    try {
        const signature = req.body as Signature;
        const result = createSignature(dbHelper,signature);

        result
            ? res.status(201).send(`Successfully created a new signature with id ${signature.id}`)
            : res.status(500).send("Failed to create a new game.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
