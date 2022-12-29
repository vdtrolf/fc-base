// External Dependencies
import * as dotenv from 'dotenv' 
dotenv.config()

import express, { Request, Response } from "express";
import Painting from "../models/paintings";
import {getList} from "./getPaintingsList"
import {getPainting} from "./getPainting"
import {createPainting} from "./createPainting"

// Set de db helper, which can be i.e. acebase or MondoDB

let dbHelper : any = null;

export const setDbHelper = (module) => {
    dbHelper = module;
}

// Global Config

export const paintingsRouter = express.Router();
paintingsRouter.use(express.json());

// GET

paintingsRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const paintings = (await getList(dbHelper));

        res.status(200).send(paintings);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

paintingsRouter.get("/:id", async (req: Request, res: Response) => {
    const id:string = req?.params?.id;
    try {
        const painting : Painting = (await getPainting(dbHelper,id));

        if (painting) {
            res.status(200).send(painting);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST

paintingsRouter.post("/", async (req: Request, res: Response) => {
    
    try {
        const painting = req.body as Painting;
        const result = createPainting(dbHelper,painting);

        result
            ? res.status(201).send(`Successfully created a new painting with id ${painting.id}`)
            : res.status(500).send("Failed to create a new game.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
