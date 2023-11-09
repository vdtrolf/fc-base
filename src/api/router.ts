// External Dependencies
import * as dotenv from 'dotenv' 
dotenv.config()

import express, { Request, Response } from "express";
import Fish from "../models/fish";
import {getFishesList} from "./getFishList"
import {getFish} from "./getFish"
import {createFish} from "./createFish"
import User from "../models/users";
import {getCellsList} from "./getCellsList"
import {getCell} from "./getCell"
import {createCell} from "./createCell"
import Cell from "../models/cell";
import {getGemsList} from "./getGemsList"
import {getGem} from "./getGem"
import {createGem} from "./createGem"
import Gem from "../models/gem";
import {getGarbagesList} from "./getGarbagesList"
import {getGarbage} from "./getGarbage"
import {createGarbage} from "./createGarbage"
import Garbage from "../models/garbage";
import {getPenguinsList} from "./getPenguinsList"
import {getPenguin} from "./getPenguin"
import {createPenguin} from "./createPenguin"
import Penguin from "../models/penguin";
import {getUsersList} from "./getUsersList"
import {getUser} from "./getUser"
import {createUser} from "./createUser"
import Island from "../models/island";
import {getIslandsList} from "./getIslandsList"
import {getIsland} from "./getIsland"
import {createIsland} from "./createIsland"

// Constants


// Set de db helper, which can be i.e. acebase or DynamoDB

let dbHelper : any = null;

export const setDbHelper = (module) => {
    dbHelper = module;
}

// Global Config

export const flashRouter = express.Router();
flashRouter.use(express.json());

const path = process.env.API_PATH ;

// GET FISH

flashRouter.get(path + "/fishes/", async (_req: Request, res: Response) => {
    try {
       const fishes = (await getFishesList(dbHelper));

        res.status(200).send(fishes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

flashRouter.get(path + "/fishes/:id", async (req: Request, res: Response) => {
    const id:string = req?.params?.id;
    try {
        const fish : Fish = (await getFish(dbHelper,id));

        if (fish) {
            res.status(200).send(fish);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching fish with id: ${req.params.id}`);
    }
});

// POST FISH

flashRouter.post(path + "/fishes/", async (req: Request, res: Response) => {
    
    try {
        const fish = req.body as Fish;
        const result = createFish(dbHelper,fish);

        result
            ? res.status(201).send(`Successfully created a new fish with id ${fish.id}`)
            : res.status(500).send("Failed to create a new fish.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// GET CELL

flashRouter.get(path + "/cells/", async (_req: Request, res: Response) => {
    try {
       const cells = (await getCellsList(dbHelper));

        res.status(200).send(cells);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

flashRouter.get(path + "/cells/:id", async (req: Request, res: Response) => {
    const id:string = req?.params?.id;
    try {
        const cell : Cell = (await getCell(dbHelper,id));

        if (cell) {
            res.status(200).send(cell);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching cell with id: ${req.params.id}`);
    }
});

// POST CELL

flashRouter.post(path + "/cells/", async (req: Request, res: Response) => {
    
    try {
        const cell = req.body as Cell;
        const result = createCell(dbHelper,cell);

        result
            ? res.status(201).send(`Successfully created a new cell with id ${cell.id}`)
            : res.status(500).send("Failed to create a new cell.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// GET GEM

flashRouter.get(path + "/gems/", async (_req: Request, res: Response) => {
    try {
       const gems = (await getGemsList(dbHelper));

        res.status(200).send(gems);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

flashRouter.get(path + "/gems/:id", async (req: Request, res: Response) => {
    const id:string = req?.params?.id;
    try {
        const gem : Gem = (await getGem(dbHelper,id));

        if (gem) {
            res.status(200).send(gem);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching gem with id: ${req.params.id}`);
    }
});

// POST GEM

flashRouter.post(path + "/gems/", async (req: Request, res: Response) => {
    
    try {
        const gem = req.body as Gem;
        const result = createGem(dbHelper,gem);

        result
            ? res.status(201).send(`Successfully created a new gem with id ${gem.id}`)
            : res.status(500).send("Failed to create a new gem.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// GET GARBAGE

flashRouter.get(path + "/garbages/", async (_req: Request, res: Response) => {
    try {
       const garbages = (await getGarbagesList(dbHelper));

        res.status(200).send(garbages);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

flashRouter.get(path + "/garbages/:id", async (req: Request, res: Response) => {
    const id:string = req?.params?.id;
    try {
        const garbage : Garbage = (await getGarbage(dbHelper,id));

        if (garbage) {
            res.status(200).send(garbage);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching garbage with id: ${req.params.id}`);
    }
});

// POST GARBAGE

flashRouter.post(path + "/garbages/", async (req: Request, res: Response) => {
    
    try {
        const garbage = req.body as Garbage;
        const result = createGarbage(dbHelper,garbage);

        result
            ? res.status(201).send(`Successfully created a new garbage with id ${garbage.id}`)
            : res.status(500).send("Failed to create a new garbage.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});


// GET PENGUIN

flashRouter.get(path + "/penguins/", async (_req: Request, res: Response) => {
    try {
       const penguins = (await getPenguinsList(dbHelper));

        res.status(200).send(penguins);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

flashRouter.get(path + "/penguins/:id", async (req: Request, res: Response) => {
    const id:string = req?.params?.id;
    try {
        const penguin : Penguin = (await getPenguin(dbHelper,id));

        if (penguin) {
            res.status(200).send(penguin);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching gem with id: ${req.params.id}`);
    }
});

// POST PENGUIN

flashRouter.post(path + "/penguins/", async (req: Request, res: Response) => {
    
    try {
        const penguin = req.body as Penguin;
        const result = createPenguin(dbHelper,penguin);

        result
            ? res.status(201).send(`Successfully created a new penguin with id ${penguin.id}`)
            : res.status(500).send("Failed to create a new penguin.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});


// GET USER

flashRouter.get(path + "/users/", async (_req: Request, res: Response) => {
    try {
       const users = (await getUsersList(dbHelper));

        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

flashRouter.get(path + "/users/:id", async (req: Request, res: Response) => {
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

flashRouter.post(path + "/users/", async (req: Request, res: Response) => {
    
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

// GET ISLAND

flashRouter.get(path + "/islands/", async (_req: Request, res: Response) => {
    try {
       const islands = (await getIslandsList(dbHelper));

        res.status(200).send(islands);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

flashRouter.get(path + "/islands/:id", async (req: Request, res: Response) => {
    const id:string = req?.params?.id;
    try {
        const island : Island = (await getIsland(dbHelper,id));

        if (island) {
            res.status(200).send(island);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching island with id: ${req.params.id}`);
    }
});

// POST ISLAND

flashRouter.post(path + "/islands/", async (req: Request, res: Response) => {
    
    try {
        console.log("================")
        console.log(req.body)
        console.log("================")

        const island = req.body as Island;
        const result = createIsland(dbHelper,island);

        console.log("-------------------")
        console.dir(island)
        console.log("-------------------")

        result
            ? res.status(201).send(`Successfully created a new island with id ${island.id}`)
            : res.status(500).send("Failed to create a new island.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
