// External Dependencies
import * as dotenv from 'dotenv' 
dotenv.config()

import express, { Request, Response } from "express";
import Signature from "../models/signatures";
import {getSignaturesList} from "./getSignaturesList"
import {getSignature} from "./getSignature"
import {createSignature} from "./createSignature"
import User from "../models/users";
import {getUsersList} from "./getUsersList"
import {getUser} from "./getUser"
import {createUser} from "./createUser"
import Cardset from "../models/cardsets";
import {getCardsetsList} from "./getCardsetsList"
import {getCardset} from "./getCardset"
import {createCardset} from "./createCardset"

// Set de db helper, which can be i.e. acebase or MondoDB

let dbHelper : any = null;

export const setDbHelper = (module) => {
    dbHelper = module;
}

// Global Config

export const flashRouter = express.Router();
flashRouter.use(express.json());

// GET SIGNATURE

flashRouter.get("/flash/signatures/", async (_req: Request, res: Response) => {
    try {
       const paintings = (await getSignaturesList(dbHelper));

        res.status(200).send(paintings);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

flashRouter.get("/flash/signatures/:id", async (req: Request, res: Response) => {
    const id:string = req?.params?.id;
    try {
        const painting : Signature = (await getSignature(dbHelper,id));

        if (painting) {
            res.status(200).send(painting);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching signature with id: ${req.params.id}`);
    }
});

// POST SIGNATURE

flashRouter.post("/flash/signatures/", async (req: Request, res: Response) => {
    
    try {
        const signature = req.body as Signature;
        const result = createSignature(dbHelper,signature);

        result
            ? res.status(201).send(`Successfully created a new signature with id ${signature.id}`)
            : res.status(500).send("Failed to create a new signature.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// GET USER

flashRouter.get("/flash/users/", async (_req: Request, res: Response) => {
    try {
       const users = (await getUsersList(dbHelper));

        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

flashRouter.get("/flash/users/:id", async (req: Request, res: Response) => {
    const id:string = req?.params?.id;
    try {
        const user : User = (await getUser(dbHelper,id));

        if (user) {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching user with id: ${req.params.id}`);
    }
});

// POST USER

flashRouter.post("/flash/users/", async (req: Request, res: Response) => {
    
    try {
        const user = req.body as User;
        const result = createUser(dbHelper,user);

        result
            ? res.status(201).send(`Successfully created a new user with id ${user.id}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// GET CARDSET

flashRouter.get("/flash/cardsets/", async (_req: Request, res: Response) => {
    try {
       const cardsets = (await getCardsetsList(dbHelper));

        res.status(200).send(cardsets);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

flashRouter.get("/flash/cardsets/:id", async (req: Request, res: Response) => {
    const id:string = req?.params?.id;
    try {
        const cardset : Cardset = (await getCardset(dbHelper,id));

        if (cardset) {
            res.status(200).send(cardset);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching cardset with id: ${req.params.id}`);
    }
});

// POST CARDSET

flashRouter.post("/flash/cardsets/", async (req: Request, res: Response) => {
    
    try {
        const cardset = req.body as Cardset;
        const result = createCardset(dbHelper,cardset);

        result
            ? res.status(201).send(`Successfully created a new cardset with id ${cardset.id}`)
            : res.status(500).send("Failed to create a new cardset.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
