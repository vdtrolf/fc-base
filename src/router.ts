// External Dependencies

import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Painting from "../models/painting";

// Global Config

export const paintingsRouter = express.Router();
paintingsRouter.use(express.json());

// GET

paintingsRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const paintings = (await collections.paintings.find({}).toArray()) as unknown  as Painting[];

        res.status(200).send(paintings);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

paintingsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new ObjectId(id) };
        const painting = (await collections.paintings.findOne(query)) as unknown as Painting;

        if (painting) {
            res.status(200).send(painting);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});
