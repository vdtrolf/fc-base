// External Dependencies
import * as dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from "express";
import User from "../data/model/user";
import { getScoresList } from "../data/repository/getScoresList"
import { getScore } from "../data/repository/getScore"
import { createScore } from "../data/repository/createScore"
import Score from "../data/model/score";
import { getUsersList } from "../data/repository/getUsersList"
import { getUser } from "../data/repository/getUser"
import { createUser } from "../data/repository/createUser"
import Environment from "../data/model/environment";
import { getEnvironmentsList } from "../data/repository/getEnvironmentsList"
import { getEnvironment } from "../data/repository/getEnvironment"

import { buildEnvironment } from "../controller/environmentController"
import { IDBHelper } from "../helpers/databaseHelper"

// Set de db helper, which can be i.e. acebase or DynamoDB

let dbHelper: IDBHelper = null;

export const setDbHelper = (dbHelperImpl: IDBHelper) => {
    dbHelper = dbHelperImpl;
}

// Global Config

export const flashRouter = express.Router();
flashRouter.use(express.json());

const path = process.env.API_PATH;

// GET NAME

flashRouter.get(path + "/create", async (_req: Request, res: Response) => {

    try {

        const size: number = _req?.query.size;
        const difficulty: number = _req?.query.difficulty;


        const Environment = await buildEnvironment(dbHelper, null)

        // console.log("============ Environment ===================")
        // console.dir(Environment)
        // console.log("=======================================")


        res.status(200).send(Environment);
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message);
    }
});

// GET SCORE

flashRouter.get(path + "/scores/", async (_req: Request, res: Response) => {
    try {
        const scores = (await getScoresList(dbHelper));

        res.status(200).send(scores);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

flashRouter.get(path + "/scores/:id", async (req: Request, res: Response) => {
    const id: string = req?.params?.id;
    try {
        const score: Score = (await getScore(dbHelper, id));

        if (score) {
            res.status(200).send(score);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching score with id: ${req.params.id}`);
    }
});

// POST SCORE

flashRouter.post(path + "/scores/", async (req: Request, res: Response) => {

    try {
        const score = req.body as Score;
        const result = createScore(dbHelper, score);

        result
            ? res.status(201).send(`Successfully created a new score with id ${score.id}`)
            : res.status(500).send("Failed to create a new score.");
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
    const id: string = req?.params?.id;
    try {
        const user: User = (await getUser(dbHelper, id));

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
        const result = createUser(dbHelper, user);

        result
            ? res.status(201).send(`Successfully created a new user with id ${user.id}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// GET Environment

flashRouter.get(path + "/Environments/", async (_req: Request, res: Response) => {
    try {
        const Environments = (await getEnvironmentsList(dbHelper));

        res.status(200).send(Environments);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

flashRouter.get(path + "/Environments/:id", async (req: Request, res: Response) => {
    const id: string = req?.params?.id;
    try {
        const Environment: Environment = (await getEnvironment(dbHelper, id));

        if (Environment) {
            res.status(200).send(Environment);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching Environment with id: ${req.params.id}`);
    }
});