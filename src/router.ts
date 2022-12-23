// External Dependencies

import express, { Request, Response } from "express";
import {getAsyncItems, getItem, putItem} from "./acebasehelper";
import Painting from "./models/paintings";

// Global Config

export const paintingsRouter = express.Router();
paintingsRouter.use(express.json());

// GET

paintingsRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const paintings = (await getAsyncItems("paintings")) as unknown ;

        res.status(200).send(paintings);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

paintingsRouter.get("/:id", async (req: Request, res: Response) => {
    const id:string = req?.params?.id;
    try {
        const painting = (await getItem("paintings",id)) as unknown as Painting;

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
        // const id:string = Math.floor(Math.random() * 1000).toString();
        const result = putItem("paintings",painting, painting.id);

        result
            ? res.status(201).send(`Successfully created a new painting with id ${painting.id}`)
            : res.status(500).send("Failed to create a new game.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
