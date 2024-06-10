import Island from "../data/model/island";
import Cell from "../data/model/cell";
import Penguin from "../data/model/penguin";
import Fish from "../data/model/fish";
import Garbage from "../data/model/garbage";

import { getUniqueId, getUniqueKey } from '../helpers/idsHelper';
import { PREFIX_PENGUIN, PREFIX_CELL, PREFIX_GARBAGE, PREFIX_FISH, PREFIX_ISLAND } from "../constants";
import { itemCollection } from "../data/model/itemInterface";

export const buildIsland = async (dbHelper , size: number, difficulty: number) => {

    const uniqueId = await getUniqueId(dbHelper, PREFIX_ISLAND)
    const uniqueKey = getUniqueKey(PREFIX_ISLAND)

    const island = new Island(uniqueId, uniqueKey);

    populateIsland(island, size, difficulty)
    island.islands.push({ 'key': island.key, 'id': island.id, 'name': island.name, 'year': island.year, 'size': island.size })

    dbHelper.putItem("islands", island, island.id);
    return island

}

const populateIsland = (island: Island, size: number, difficulty: number = 1) => {

    island.difficulty = difficulty

    const penguinsPos: itemCollection = {}
    const fishesPos: itemCollection = {}
    const garbagesPos: itemCollection = {}

    //build islands in the world
    const tmpland = []
    for (let i = 0; i < size; i++) {
        const lane = []
        for (let j = 0; j < size; j++) {
            lane.push(0)
        }
        tmpland.push(lane)
    }

    // add some mountains     
    for (let i = 0; i < size / 3; i++) {
        const v = 1 + Math.floor(Math.random() * (size - 2))
        const h = 1 + Math.floor(Math.random() * (size - 2))
        tmpland[v][h] = 15
    }

    // add some land around the mountains 
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < size * i; j++) {
            const v = 1 + Math.floor(Math.random() * (size - 2))
            const h = 1 + Math.floor(Math.random() * (size - 2))

            if (tmpland[v][h] === 0
                && (tmpland[v][h + 1] > 0 || tmpland[v][h - 1] > 0 || tmpland[v + 1][h] > 0 || tmpland[v - 1][h] > 0)) {
                tmpland[v][h] = 15 - i * 3
            }
        }
    }

    // remove the lakes and the istmes        
    for (let i = 0; i < size - 2; i++) {
        for (let j = 0; j < size - 2; j++) {
            const v = i + 1
            const h = j + 1
            if (tmpland[v][h] === 0) {
                let cnt = 0
                if (tmpland[v][h + 1] > 0) cnt += 1
                if (tmpland[v][h - 1] > 0) cnt += 1
                if (tmpland[v + 1][h] > 0) cnt += 1
                if (tmpland[v - 1][h] > 0) cnt += 1
                if (cnt > 2) tmpland[v][h] = 1
            }
        }
    }

    // create cells 
    for (let i = 0; i < size; i++) {
        const tmplane = []
        for (let j = 0; j < size; j++) {
            tmplane.push(new Cell(getUniqueKey(PREFIX_CELL), i, j, tmpland[i][j]))
        }
        island.cells.push(tmplane)
    }

    // add some penguins
    let cntpenguins = 0
    while (cntpenguins < size / 2) {
        const v = Math.floor(Math.random() * (size - 1))
        const h = Math.floor(Math.random() * (size - 1))

        if (island.cells[v][h].isGround() && !penguinsPos[v * 100 + h]) {
            const uniqueKey = getUniqueKey(PREFIX_PENGUIN)
            const penguin = new Penguin(1, uniqueKey, v, h);
            island.penguins.push(penguin)
            penguinsPos[v * 100 + h] = penguin;
            cntpenguins += 1
        }
    }

    // add some garbage
    let cntgarbages = 0
    let tryCount = 0
    while (cntgarbages < size / 4 && tryCount < 20) {
        const v = Math.floor(Math.random() * (size - 1))
        const h = Math.floor(Math.random() * (size - 1))

        if ((v + h) > 0 && island.cells[v][h].isSea() && (v === 0 || v === size - 1 || h === 0 || h === size - 1) && !garbagesPos[v * 100 + h]) {
            const uniqueKey = getUniqueKey(PREFIX_GARBAGE)
            const garbage = new Garbage(1, uniqueKey, v, h);
            island.garbages.push(garbage)
            garbagesPos[v * 100 + h] = garbage;
            cntgarbages += 1
        }
        tryCount += 1
    }

    // add some fishes
    let cntfishes = 0
    tryCount = 0
    while (cntfishes < size / 2 && tryCount < 20) {
        const v = Math.floor(Math.random() * (size - 1))
        const h = Math.floor(Math.random() * (size - 1))

        if ((v + h) > 0 && island.cells[v][h].isSea() && !garbagesPos[v * 100 + h] && !fishesPos[v * 100 + h]) {
            const uniqueKey = getUniqueKey(PREFIX_FISH)
            const fish = new Fish(1, uniqueKey, v, h);
            island.fishes.push(fish)
            fishesPos[v * 100 + h] = fish;
            cntfishes += 1
        }
    }
    tryCount += 1

}