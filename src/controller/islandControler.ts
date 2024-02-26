import Island from "../data/model/island";
import Cell from "../data/model/cell";
import Penguin from "../data/model/penguin";
import Fish from "../data/model/fish";
import Garbage from "../data/model/garbage";
import Gem from "../data/model/gem";

import { cellBecomeOlder } from "./cellController"
import { gemBecomeOlder } from "./gemController";
import { fishBecomeOlder } from "./fishController"
import { penguinBecomeOlder, penguinReceiveCommands, penguinExecuteCommand } from "./penguinController"
import { IDBHelper } from "../helpers/databaseHelper"


import { randomWeather } from "../helpers/utilHelpers"

import { getUniqueId, getUniqueKey } from '../helpers/idsHelper';
import { PREFIX_PENGUIN, PREFIX_CELL, PREFIX_GARBAGE, PREFIX_FISH, PREFIX_ISLAND, PREFIX_GEM } from "../constants";
import { garbageBecomeOlder } from "./garbageController";
import { itemCollection } from "../data/model/itemInterface";

export const buildIsland = async (dbHelper, size: number, difficulty: number) => {

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

        if (island.cells[v][h].isSea() && (v === 0 || v === size - 1 || h === 0 || h === size - 1) && !garbagesPos[v * 100 + h]) {
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

        if (island.cells[v][h].isSea() && !garbagesPos[v * 100 + h] && !fishesPos[v * 100 + h]) {
            const uniqueKey = getUniqueKey(PREFIX_FISH)
            const fish = new Fish(1, uniqueKey, v, h);
            island.fishes.push(fish)
            fishesPos[v * 100 + h] = fish;
            cntfishes += 1
        }
    }
    tryCount += 1

}



const populatePenguins = (island : Island) => {
    let penguinsPos: itemCollection = {};
    island.penguins.forEach(penguin => {
        penguinsPos[penguin.vpos * 100 + penguin.hpos] = penguin
    });
    return penguinsPos
}

const populateCells = (island : Island) => {
    const cellsPos: { [key: number]: Cell } = {}
    for (let i = 0; i < island.size; i++) {
        for (let j = 0; j < island.size; j++) {
            cellsPos[i * 100 + j] = island.cells[i][j]
        }
    }
    return cellsPos 
}

const populateFishes = (island : Island) => {
    const fishesPos: itemCollection = {};
    island.fishes.forEach(function(item, index, object) {
        if (!item.alive) {
            object.splice(index, 1);
        }
    });
    return fishesPos
}
const populateGarbages = (island : Island) => {
    const garbagesPos: itemCollection = {};
    island.garbages.forEach(function(item, index, object) {
        if (item.isTaken) {
            object.splice(index, 1);
        } else {
            garbagesPos[item.vpos * 100 + item.hpos] = item
        }
    });
    return garbagesPos
}

const populateGems = (island : Island) => {
    const gemsPos: itemCollection = {};
    island.gems.forEach(function(item, index, object) {
        if (item.isTaken || item.age < 1) {
            object.splice(index, 1);
        } else {
            gemsPos[item.vpos * 100 + item.hpos] = item
        }
    });
    return gemsPos
}



export const transmitCommands = (island: Island, penguinId: number, commands: string[]) => {

    island.penguins.forEach(penguin => {
        if (penguin.key == penguinId) {
            penguinReceiveCommands(penguin, commands)

            // penguinBecomeOlder(penguin, 
            //     populateCells(island), 
            //     island.size, 
            //     populatePenguins(island), 
            //     populatePenguins(island), 
            //     populateFishes(island), 
            //     populateGems(island), 
            //     populateGarbages(island),
            //     island.weather, 
            //     island.evolutionSpeed,
            //     false)
 

            

            // command = interpret_commands(commands,0,0,self.cells,self.fishes,self.gems,self.garbages)
            // print(command)
            // append_event_to_log(f"{penguin.name.title()}: {command['activityName']} {command['directionName']}")  
        }
    });
}



export const becomeOlder = async (dbHelper: IDBHelper, island: Island) => {

    const deepDebug = false

    let penguinsPos: itemCollection = {} = populatePenguins(island)
    const fishesPos: itemCollection = {} = populateFishes(island)
    const garbagesPos: itemCollection = {} =populateGarbages(island)
    const cellsPos: { [key: number]: Cell } = populateCells(island)
    const gemsPos: itemCollection = populateGems(island)

    if (island.onGoing) {
        island.counter += 1
        island.evolutionSpeed = Math.floor(island.counter / 40) + 1
        if (island.evolutionSpeed > 5)
            island.evolutionSpeed = 5

        island.year += 0.05

        const weather = randomWeather(island.year, island.weather, island.weatherAge)
        island.weather = weather[0]
        island.weatherAge = weather[1]

        //  cells become_older, notably to make them smelt over time
        for (let v = 1; v < island.size; v++) {
            for (let h = 1; h < island.size; h++) {
                const cell = island.cells[v][h]
                cellBecomeOlder(cell, cellsPos, island.size, island.weather, island.evolutionSpeed)
            }
        }

        // fishes become older, notably to make them move   
        island.fishes.forEach(fish => {
            if (fish.alive) {
                const move = fishBecomeOlder(fish, cellsPos, fishesPos, garbagesPos, island.size)
                fish.vpos = move.vpos
                fish.hpos = move.hpos
                fish.direction = move.direction
                fish.lastDirection = move.direction
                fishesPos[move.vpos * 100 + move.hpos] = fish
            }
        })

        // add some fishes
        let cntFishes = island.fishes.length
        let tryCounter = 0
        while (cntFishes < island.size / 2 && tryCounter < 10) {
            const v = Math.floor(Math.random() * (island.size - 1))
            const h = Math.floor(Math.random() * (island.size - 1))

            if (cellsPos[v * 100 + h].type === 0 && !fishesPos[v * 100 + h] && !garbagesPos[v * 100 + h]) {
                const uniqueKey = getUniqueKey(PREFIX_FISH)
                const fish = new Fish(1, uniqueKey, v, h);
                island.fishes.push(fish)
                fishesPos[v * 100 + h] = fish;
                cntFishes += 1
            }
            tryCounter += 1
        }

        // garbage becomes older, notably change type
        island.garbages.forEach(garbage => {
            garbageBecomeOlder(garbage)
        })

        // add some extra garbage - must be next another garbage
        // gets more chances to happen if the evolution speed raises
        if (island.evolutionSpeed > 0) {
            for (let i = 0; i < island.evolutionSpeed; i++) {
                const v = Math.floor(Math.random() * (island.size))
                const h = Math.floor(Math.random() * (island.size))

                //console.log("=============> GARBAGE 1 " + v + " " + h)

                if (cellsPos[v * 100 + h].type === 0 && !fishesPos[v * 100 + h] && !garbagesPos[v * 100 + h]
                    && (garbagesPos[(v + 1) * 100 + h] || garbagesPos[(v - 1) * 100 + h] || garbagesPos[v * 100 + h + 1] || garbagesPos[v * 100 + h - 1])) {

                    // console.log("=============> GARBAGE")

                    const uniqueKey = getUniqueKey(PREFIX_GARBAGE)
                    const garbage = new Garbage(1, uniqueKey, v, h);
                    island.garbages.push(garbage)
                    garbagesPos[v * 100 + h] = garbage
                }
            }

            island.gems.forEach(gem => {
                gemBecomeOlder(gem)
            });


            // add some gems
            if (island.gems.length < island.size / 2) {
                const v = Math.floor(Math.random() * (island.size - 1))
                const h = Math.floor(Math.random() * (island.size - 1))

                const hasShowel = Math.floor(Math.random() * 10) > 8
                if (cellsPos[v * 100 + h].type > 0 && !penguinsPos[v * 100 + h] && !gemsPos[v * 100 + h]) {
                    const uniqueKey = getUniqueKey(PREFIX_GEM)
                    const gem = new Gem(1, uniqueKey, v, h, hasShowel);
                    island.gems.push(gem)
                    gemsPos[v * 100 + h] = gem
                }
            }


            // penguins become_older, notably to make them older, execute commands and get childs
            const tmpPenguinsPos = {}
            island.penguins.forEach(penguin => {
                // const hasChild = 
                penguinBecomeOlder(penguin, cellsPos, island.size, penguinsPos, tmpPenguinsPos, fishesPos, gemsPos, garbagesPos, island.weather, island.evolutionSpeed)
                if (penguin.alive || penguin.deadAge < 6) {
                    tmpPenguinsPos[penguin.vpos * 100 + penguin.hpos] = penguin
                }
                // if (hasChild) { 
                //     counter = 0
                //     while counter < 10:
                //         v = random.randint(1,self.size-2)
                //         h = random.randint(1,self.size-2)
                //         if self.cells[v][h].isGround() and not self.penguins.get(v*100+h) and not self.gems.get(v*100+h):
                //             tmppenguins[v*100+h]=Penguin(childCounter,v,h)
                //             childCounter += 1
                //             break
                //         counter += 1   
            });
            penguinsPos = tmpPenguinsPos



        }

        if (deepDebug) {
            console.log("================ island =============")
            console.dir(island)
            console.log("================ island =============")
        }

        dbHelper.putItem("islands", island, island.id);
    }

    return island

}

