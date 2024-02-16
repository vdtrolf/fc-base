import Island from "../data/model/island";
import Cell from "../data/model/cell";
import Penguin from "../data/model/penguin";
import Fish from "../data/model/fish";
import Garbage from "../data/model/garbage";
import Gem from "../data/model/gem";


import { cellBecomeOlder } from "./cellController"
import { fishBecomeOlder } from "./fishController"
import { penguinBecomeOlder, penguinReceiveCommands} from "./penguinController"


import { randomWeather } from "../helpers/utilHelpers"

import { getUniqueId,getUniqueKey } from '../helpers/idsHelper';
import { PREFIX_PENGUIN, PREFIX_CELL, PREFIX_GARBAGE, PREFIX_FISH, PREFIX_ISLAND,WEATHER_SUN, WEATHER_RAIN,WEATHER_SNOW } from "../constants";
import { garbageBecomeOlder } from "./garbageController";


export const buildIsland = async (dbHelper:any, size : number, difficulty:number ) => {
        
    const uniqueId = await getUniqueId(dbHelper,PREFIX_ISLAND)
    const uniqueKey = getUniqueKey(PREFIX_ISLAND)

    const island = new Island(uniqueId,uniqueKey);
    
    populateIsland(island,size)
    island.islands.push({'key':island.key,'id':island.id,'name':island.name,'year':island.year,'size':island.size})
    
    dbHelper.putItem("islands",island, island.id);
    return island
        
}

const populateIsland = (island : Island, size: number) => {


    let penguinsPos : {} = {}
    let fishesPos : {} = {}
    let garbagesPos : {} = {}

    //build islands in the world
    let tmpland = []
    for (let i= 0; i< size; i++) {
        let lane =[]
        for (let j= 0;j<size;j++) {
            lane.push(0)
        }
        tmpland.push(lane)
    }
            
    // add some mountains     
    for (let i=0; i < size / 3; i++) {
        let v = 1 + Math.floor(Math.random() * (size -2))
        let h = 1 + Math.floor(Math.random() * (size -2))
        tmpland[v][h] = 15
    }
            
    // add some land around the mountains 
    for (let i=0; i<4; i++) {
        for (let j=0; j< size * i;j++) {
            let v = 1 + Math.floor(Math.random() * (size-2))
            let h = 1 + Math.floor(Math.random() * (size-2))
            
            if (tmpland[v][h] == 0 
                && (tmpland[v][h+1] > 0 || tmpland[v][h-1] > 0 || tmpland[v+1][h] > 0 || tmpland[v-1][h] > 0 )) {
                tmpland[v][h] = 15-i*3
            }
        }
    }
                    
    // remove the lakes and the istmes        
    for (let i=0; i < size -2;i++ ) {
        for (let j=0; j<size -2;j++) {
            let v=i+1
            let h=j+1
            if (tmpland[v][h] == 0) {
                let cnt = 0
                if (tmpland[v][h+1] > 0) cnt += 1
                if (tmpland[v][h-1] > 0) cnt += 1
                if (tmpland[v+1][h] > 0) cnt += 1
                if (tmpland[v-1][h] > 0) cnt += 1
                if (cnt > 2) tmpland[v][h] = 1
            }
        }
    }
            
    // create cells 
    for (let i=0; i<size;i++ ) {   
        let tmplane = []
        for (let j=0; j< size;j++) {
            tmplane.push( new Cell(getUniqueKey(PREFIX_CELL),i,j,tmpland[i][j]))
        }
        island.cells.push(tmplane)
    }
    
    // add some penguins
    let cntpenguins=0
    while (cntpenguins < size / 2) {
        let v = Math.floor(Math.random() * (size-1))
        let h = Math.floor(Math.random() * (size-1))
        
        if (island.cells[v][h].isGround() && ! penguinsPos[v*100+h]) {
            const uniqueKey = getUniqueKey(PREFIX_PENGUIN)
            let penguin = new Penguin(1,uniqueKey,v,h);
            island.penguins.push(penguin)
            penguinsPos[v*100 + h] = penguin;
            cntpenguins +=1
        }
    }
    
    // add some garbage
    let cntgarbages=0
    let tryCount = 0
    while (cntgarbages < size / 4 && tryCount < 20) {
        let v = Math.floor(Math.random() * (size-1))
        let h = Math.floor(Math.random() * (size-1))
        
        if (island.cells[v][h].isSea() && (v == 0 || v == size-1 || h==0 || h == size-1) && ! garbagesPos[v*100 + h]) {
            const uniqueKey = getUniqueKey(PREFIX_GARBAGE)
            let garbage = new Garbage(1,uniqueKey,v,h);
            island.garbages.push(garbage)
            garbagesPos[v*100 + h] = garbage;
            cntgarbages +=1
        }
        tryCount += 1
    }
                    
    // add some fishes
    let cntfishes=0
    tryCount = 0
    while (cntfishes < size / 2 && tryCount < 20) {
        let v = Math.floor(Math.random() * (size-1))
        let h = Math.floor(Math.random() * (size-1))
        
        if (island.cells[v][h].isSea() && ! garbagesPos[v*100+h] && ! fishesPos[v*100+h]) {
            const uniqueKey = getUniqueKey(PREFIX_FISH)
            let fish = new Fish(1,uniqueKey,v,h);
            island.fishes.push(fish)
            fishesPos[v*100 + h] = fish;
            cntfishes +=1
        }
    }
    tryCount += 1

}

export const transmitCommands = (island : Island, penguinId : number , commands: string[]) => {

    island.penguins.forEach(penguin => { 
        if (penguin.key == penguinId) {
            penguinReceiveCommands(penguin,commands)
            // command = interpret_commands(commands,0,0,self.cells,self.fishes,self.gems,self.garbages)
            // print(command)
            // append_event_to_log(f"{penguin.name.title()}: {command['activityName']} {command['directionName']}")  
        } 
    });
}




export const becomeOlder = async (dbHelper:any, island : Island) => {

    let deepDebug = false

    let penguinsPos : {} = {}
    let fishesPos : {} = {}
    let garbagesPos : {} = {}
    let cellsPos : {} = {}
    let gemsPos : {} = {}

    for (let i=0; i<island.size;i++ ) {   
        let tmplane = []
        for (let j=0; j< island.size;j++) {
            cellsPos[i*100 +j] = island.cells[i][j].type
        }
    }

    island.penguins.forEach(penguin => {
        penguinsPos[penguin.vpos * 100 + penguin.hpos] = penguin
    });

    island.fishes.forEach(fish => {
        fishesPos[fish.vpos * 100 + fish.hpos] = fish
    });

    island.garbages.forEach(garbage => {
        garbagesPos[garbage.vpos * 100 + garbage.hpos] = garbage
    });

    island.gems.forEach(gem => {
        gemsPos[gem.vpos * 100 + gem.hpos] = gem
    });


    if ( island.onGoing ){
        island.counter += 1
        island.evolutionSpeed = Math.floor(island.counter/40) + 1
        if (island.evolutionSpeed > 5) 
            island.evolutionSpeed = 5
    
        island.year += 0.05

        let weather = randomWeather(island.year,island.weather,island.weatherAge)    
        island.weather = weather[0]
        island.weatherAge = weather[1]
            
        //  cells become_older, notably to make them smelt over time
        for (let v =1; v < island.size; v++) {
            for (let h=1; h < island.size; h++ ) {
                let cell = island.cells[v][h] 
                cellBecomeOlder(cell, island.cells,island.size,island.weather, island.evolutionSpeed)      
            }
        }

        // fishes become older, notably to make them move 
    
        let fishesPos = {}
        island.fishes.forEach(fish => {
            if (fish.alive) {
                let move = fishBecomeOlder(fish, cellsPos, fishesPos, garbagesPos,island.size)
                fish.vpos = move.vpos
                fish.hpos = move.hpos
                fish.direction = move.direction
                fish.lastDirection = move.direction
                fishesPos[move.vpos*100+move.hpos]=fish
            }
        })

        // console.log("================= FISHES ============" )
        // console.dir(island.fishes)
        // console.log("================= FISHES ============" )        

        // add some fishes
        let cntFishes= island.fishes.length
        let tryCounter = 0
        while (cntFishes < island.size / 2 && tryCounter < 20) {
            let v = Math.floor(Math.random() * (island.size-1))
            let h = Math.floor(Math.random() * (island.size-1))
                    
            if (island.cells[v][h].isSea() && ! fishesPos[v*100+h] && ! garbagesPos[v*100+h]){
                const uniqueKey = getUniqueKey(PREFIX_FISH)
                let fish = new Fish(1,uniqueKey,v,h);
                island.fishes.push(fish)
                fishesPos[v*100 + h] = fish;
                cntFishes +=1  
            }
            tryCounter += 1
        }

        garbagesPos = {}
        island.garbages.forEach(garbage => {
            if ( ! garbage.isTaken) {
                garbageBecomeOlder(garbage)
                garbagesPos[garbage.vpos*100+garbage.hpos]=garbage
            }
        })

        // console.log("=============> GARBAGE 0")


        // add some extra garbage - must be next another garbage
        // gets more chances to happen if the evolution speed raises
        if (island.evolutionSpeed > 0) {
            for (let i = 0; i < island.evolutionSpeed;i++) {
                let v = Math.floor(Math.random() * (island.size))
                let h = Math.floor(Math.random() * (island.size))

                //console.log("=============> GARBAGE 1 " + v + " " + h)
                
                if (cellsPos[v* 100 + h] === 0  && ! fishesPos[v*100+h] && ! garbagesPos[v*100+h]
                   && ( garbagesPos[(v+1)*100+h] || garbagesPos[(v-1)*100+h] || garbagesPos[v*100+h+1] || garbagesPos[v*100+h-1])) {
                    
                    // console.log("=============> GARBAGE")

                    const uniqueKey = getUniqueKey(PREFIX_GARBAGE)
                    let garbage = new Garbage(1,uniqueKey,v,h);
                    island.garbages.push(garbage)
                    garbagesPos[v*100+h] = garbage
                }
            }

            // penguins become_older, notably to make them older, execute commands and get childs
            let tmpPenguinsPos = {}
            let childCounter = island.penguins.length + 1
            island.penguins.forEach(penguin => {
                let hasChild = penguinBecomeOlder(penguin, cellsPos, island.size, penguinsPos, tmpPenguinsPos,fishesPos, gemsPos, garbagesPos ,island.weather,island.evolutionSpeed,false)
                if (penguin.alive || penguin.deadAge < 6) {
                    tmpPenguinsPos[penguin.vpos*100+penguin.hpos]=penguin
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

        dbHelper.putItem("islands",island, island.id);
    }

    // console.log("================ island =============")
    // console.dir(island)
    // console.log("================ island =============")

    return island

} 

// def execute_commands(self) :
// for penguin in self.penguins.values():
//     penguin.execute_commands(self.cells,self.size,self.penguins,self.penguins,self.fishes,self.gems,self.garbages)

// # penguins become_older, notably to make them older, execute commands and get childs
// tmppenguins = {}
// for penguin in self.penguins.values():
//     if penguin.alive or penguin.deadAge < 6:
//         tmppenguins[penguin.vpos*100+penguin.hpos]=penguin
// self.penguins = tmppenguins;



// def become_older(self,force=False):
//         """
//         Makes the island, penguins and artifacts older
//         The speed of the evolution raises according to the variable 'counter'        
//         """

//          

//             # penguins become_older, notably to make them older, execute commands and get childs
//             tmppenguins = {}
//             childCounter = len(self.penguins) + 1
//             for penguin in self.penguins.values():
//                 hasChild = penguin.become_older(self.cells,self.size,self.penguins,tmppenguins,self.fishes,self.gems,self.garbages,self.weather,self.evolution_speed,force)
//                 if penguin.alive or penguin.deadAge < 6:
//                     tmppenguins[penguin.vpos*100+penguin.hpos]=penguin
//                 if hasChild: 
//                     counter = 0
//                     while counter < 10:
//                         v = random.randint(1,self.size-2)
//                         h = random.randint(1,self.size-2)
//                         if self.cells[v][h].isGround() and not self.penguins.get(v*100+h) and not self.gems.get(v*100+h):
//                             tmppenguins[v*100+h]=Penguin(childCounter,v,h)
//                             childCounter += 1
//                             break
//                         counter += 1    

//             self.penguins = tmppenguins

//             self.cleanFishes()

//            

//             if not self.game_ongoing and self.game_end_datetime == None:
//                 self.game_end_datetime = datetime.now()
//                 print(f'##### ENDGAME AT {self.game_end_datetime} #####')    

//             if len(self.gems) < self.size:
//                 v = random.randint(0,self.size-1)
//                 h = random.randint(0,self.size-1)
//                 hasShowel = random.randint(0,10) > 8
//                 if self.cells[v][h].isIce() and not self.penguins.get(v*100+h) and not self.gems.get(v*100+h):
//                     self.gems[v*100+h]=Gem(v,h,hasShowel)
