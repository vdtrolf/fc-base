// External Dependencies
import * as dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from "express";

import Story from "../data/model/story";
import { getStoriesList } from "../data/repository/getStoriesList"
import { getStory } from "../data/repository/getStory"
import { createStory } from "../data/repository/createStory"

import NewsItem from "../data/model/newsItem";
import { getNewsItemsList } from "../data/repository/getNewsItemsList"
import { getNewsItem } from "../data/repository/getNewsItem"
import { createNewsItem } from "../data/repository/createNewsItem"

import Score from "../data/model/score";
import { getScoresList } from "../data/repository/getScoresList"
import { getScore } from "../data/repository/getScore"
import { createScore } from "../data/repository/createScore"

import User from "../data/model/user";
import { getUsersList } from "../data/repository/getUsersList"
import { getUser } from "../data/repository/getUser"
import { createUser } from "../data/repository/createUser"

import Simulation from "../data/model/simulation";
import { getSimulationsList } from "../data/repository/getSimulationsList"
import { getSimulation } from "../data/repository/getSimulation"

import { buildSimulation } from "../controller/simulationController"
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

        //const size: number = _req?.query.size;
        //const difficulty: number = _req?.query.difficulty;


        const Simulation = await buildSimulation(dbHelper, null)

        // console.log("============ Simulation ===================")
        // console.dir(Simulation)
        // console.log("=======================================")


        res.status(200).send(Simulation);
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

// GET STORY

flashRouter.get(path + "/stories/", async (_req: Request, res: Response) => {
    try {
        const stories = (await getStoriesList(dbHelper));

        res.status(200).send(stories);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

flashRouter.get(path + "/stories/:id", async (req: Request, res: Response) => {
    const id: string = req?.params?.id;
    try {
        const story: Story = (await getStory(dbHelper, id));

        if (story) {
            res.status(200).send(story);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching story with id: ${req.params.id}`);
    }
});

// POST STORY

flashRouter.post(path + "/stories/", async (req: Request, res: Response) => {

    try {
        const story = req.body as Story;
        const result = createStory(dbHelper, story);

        result
            ? res.status(201).send(`Successfully created a new story with id ${story.id}`)
            : res.status(500).send("Failed to create a new story.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// GET NEWSITEM

flashRouter.get(path + "/newsItems/", async (_req: Request, res: Response) => {
    try {
        const newsItems = (await getNewsItemsList(dbHelper));

        res.status(200).send(newsItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

flashRouter.get(path + "/newsItems/:id", async (req: Request, res: Response) => {
    const id: string = req?.params?.id;
    try {
        const newsItem: NewsItem = (await getNewsItem(dbHelper, id));

        if (newsItem) {
            res.status(200).send(newsItem);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching story with id: ${req.params.id}`);
    }
});

// POST NEWSITEM

flashRouter.post(path + "/newsItems/", async (req: Request, res: Response) => {

    try {
        const newsItem = req.body as NewsItem;
        const result = createNewsItem(dbHelper, newsItem);

        result
            ? res.status(201).send(`Successfully created a new story with id ${newsItem.id}`)
            : res.status(500).send("Failed to create a new story.");
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

// GET Simulation

flashRouter.get(path + "/Simulations/", async (_req: Request, res: Response) => {
    try {
        const Simulations = (await getSimulationsList(dbHelper));

        res.status(200).send(Simulations);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

flashRouter.get(path + "/Simulations/:id", async (req: Request, res: Response) => {
    const id: string = req?.params?.id;
    try {
        const Simulation: Simulation = (await getSimulation(dbHelper, id));

        if (Simulation) {
            res.status(200).send(Simulation);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching Simulation with id: ${req.params.id}`);
    }
});