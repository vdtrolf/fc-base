import Penguin from "../data/model/penguin";
import Cell from "../data/model/cell";

import { randomDirection } from "../helpers/utilHelpers";
import { interpretCommands } from "../helpers/interpreter";

import {ACTIVITY_DEAD, ACTIVITY_FLEE, ACTIVITY_BUILDING, ACTIVITY_EATING, ACTIVITY_NONE,ACTIVITY_MOVING,ACTIVITY_CLEANING,ACTIVITY_FISHING,ACTIVITY_GETING,ACTIVITY_LOVING, DIRECTION_NONE, ACTIVITY_NAMES } from "../constants";


//
// makes the penguin move && become older
// age, temperature && hunger increase faster if the evolution_speed raises
// 
export const penguinBecomeOlder = (penguin : Penguin , cellsPos : {}, size:number, penguinsPos : {}, newpenguins : {} , fishesPos : {} , gemsPos: {} ,garbagesPos: {} ,weather: number ,evolution_speed : number ,force : boolean) => {

    //  check if there is a neighbour
    let hasNeighbour =  penguinsPos[(penguin.vpos+1) *100 + penguin.hpos]|| penguinsPos[(penguin.vpos-1) *100 + penguin.hpos] || penguinsPos[penguin.vpos *100 + penguin.hpos-1] || penguinsPos[penguin.vpos *100 + penguin.hpos+1]   
    let hasChild = false
    
    if (penguin.activityTime > 0) {
        penguin.activityTime -= 1
        penguin.activity = ACTIVITY_NONE
        if (penguin.activityTime === 0) {
            if (penguin.activity == ACTIVITY_MOVING || penguin.activity == ACTIVITY_FLEE ) {
                penguin.activity = ACTIVITY_NONE
                penguin.activityDirection = DIRECTION_NONE
            } else if (penguin.activity == ACTIVITY_FISHING) {
                penguin.hasFish = true
                penguin.activity = ACTIVITY_NONE
                penguin.activityDirection = DIRECTION_NONE
                fishesPos[penguin.activityTarget].isDead = true
            } else if (penguin.activity == ACTIVITY_GETING ) {
                penguin.hasGem = true
                penguin.activity = ACTIVITY_NONE
                penguin.activityDirection = DIRECTION_NONE
                if (gemsPos[penguin.activityTarget] ) {
                    gemsPos[penguin.activityTarget].isTaken = true
                    if (gemsPos[penguin.activityTarget].hasShowel ){
                        penguin.hasShowel = true
                        penguin.showelCnt = 2
                        gemsPos[penguin.activityTarget].hasShowel == false
                    }
                } 
            } else if (penguin.activity == ACTIVITY_CLEANING) {
                penguin.activity = ACTIVITY_NONE
                penguin.activityDirection = DIRECTION_NONE
                if ( garbagesPos[penguin.activityTarget] ){
                    garbagesPos[penguin.activityTarget].isTaken = true    
                }
                penguin.showelCnt -= 1
                penguin.hasShowel = penguin.showelCnt > 0         
            } else if (penguin.activity == ACTIVITY_EATING ) {
                penguin.hunger = 0
                penguin.hasFish = false
                penguin.activity = ACTIVITY_NONE
                penguin.activityDirection = DIRECTION_NONE
            } else if ( penguin.activity == ACTIVITY_LOVING ) {
                penguin.temp = 0
                penguin.hunger = 0
                hasChild = penguin.inLove
                penguin.inLove = false
                penguin.activity = ACTIVITY_NONE
                penguin.activityDirection = DIRECTION_NONE    
            } else if (penguin.hasGem && penguin.activity == ACTIVITY_BUILDING){
                penguin.temp = 0
                penguin.hasGem = false
                cellsPos[penguin.activityVPos * 100 + penguin.activityHPos].endBuilding()
                penguin.activity = ACTIVITY_NONE 
                penguin.activityDirection = DIRECTION_NONE  
            }
        
            penguin.goal = ACTIVITY_NONE       

            penguin.activityText = ACTIVITY_NAMES[penguin.activity]  

            console.log("===========> " + penguin.activity + " = " + penguin.activityText)    

        }  
    }
    if (penguin.alive) {
                 
        if (penguin.loveTime > 0) {
            penguin.loveTime -= 1
        } else {
            penguin.canLove = true
        }

        if (penguin.isChild || penguin.isOld) {
            penguin.age += 0.2
        } else {    
            penguin.age += 0.05
        }

        penguin.isChild = penguin.age <= 3 
        penguin.isOld = penguin.age > 13 
                        
        if (! hasNeighbour) {  
            penguin.temp += weather / (6 - evolution_speed)
        }
        penguin.hunger += (penguin.shape + 1) / (6 - evolution_speed) 

        // Is the penguin dead ?
        if (penguin.age > 20) { 
            penguin.alive = false
            penguin.activity = ACTIVITY_DEAD
            penguin.activityText = 'Died (age)'
            // append_event_to_log(f'{penguin.name.title()} died (age)')
            return false
        } else if (penguin.temp > 99) {
            penguin.alive = false
            penguin.activity = ACTIVITY_DEAD
            penguin.activityText = 'Died (cold)'
            // append_event_to_log(f'{penguin.name.title()} died (cold)')
            return false
        } else if (penguin.hunger > 99) {
            penguin.alive = false
            penguin.activity = ACTIVITY_DEAD
            penguin.activityText = 'Died (hunger)'
            // append_event_to_log(f'{penguin.name.title()} died (hunger)')    
            return false
        } else if (cellsPos[penguin.vpos * 100 + penguin.hpos].cellType == 0) {
            penguin.alive = false
            penguin.activity = ACTIVITY_DEAD
            penguin.activityText = 'Died (sunk)'
            // append_event_to_log(f'{penguin.name.title()} died (sunk)')
            return false
        }
        // if force:
        penguinExecuteCommand(penguin,cellsPos,size,penguinsPos,newpenguins,fishesPos,gemsPos,garbagesPos)

        // if alive && if the penguin is on smelting ice: try to escape
        if (cellsPos[penguin.vpos * 100 + penguin.hpos] < 3) {
            let direction = randomDirection(penguin.vpos,penguin.hpos)
            let coord = direction.vpos * 100 + direction.hpos
            if (direction.vpos > 0 && direction.vpos < size && direction.hpos > 0 && direction.hpos < size 
                && cellsPos[direction.vpos * 100 + direction.hpos] > cellsPos[penguin.vpos * 100 + penguin.hpos]
                && ! penguinsPos[coord] && ! newpenguins[coord] ) {

                penguin.vpos = direction.vpos
                penguin.hpos = direction.hpos
                penguin.activity = ACTIVITY_FLEE
                penguin.goal = ACTIVITY_FLEE
                penguin.activityTime = 1
                penguin.activityDirection = direction.direction
        
            }
        }
    } else {
        penguin.deadAge += 1
    }
    return hasChild
    
}

// Receives an order to move or perform an activity
export const penguinReceiveCommands = (penguin: Penguin,commands: string[]) => {
    commands.forEach(command => {
        if (command.length > 0) {
            penguin.commands.push(command)
        }
    });
}


export const penguinExecuteCommand = (penguin : Penguin, cellsPos: {},size:number ,penguinsPos: {},newpenguins: {},fishesPos: {},gemsPos: {},garbagesPos: {}) => {
       
    let deepDebug = false

    // Is there an order to execute
    if ( penguin.commands.length > 0 ) {
        let command = interpretCommands(penguin.commands,penguin.vpos,penguin.hpos,cellsPos,fishesPos,gemsPos,garbagesPos)
        
        if (deepDebug) {
            console.log("================= COMMAND =============")
            console.dir(command)
            console.log("================= COMMAND =============")
        }
        
        let direction = {'vpos':penguin.vpos + command['vmove'],'hpos':penguin.hpos + command['hmove']}
        let coord = direction.vpos*100 + direction.hpos
        if (command.activity == ACTIVITY_MOVING) {
            if (direction.vpos > 0 && direction.vpos < size && direction.hpos > 0 && direction.hpos < size && ! penguinsPos[coord] && ! newpenguins[coord] ) {
                penguin.vpos = direction.vpos
                penguin.hpos = direction.hpos
                penguin.activity = command.activity
                penguin.goal = command.activity
                penguin.activityDirection = command['directionNum']
                penguin.activityTime = 1      
            }
        } else if (command.activity == ACTIVITY_FISHING) {
            if ( fishesPos[coord] ) {
                fishesPos[coord].onHook=true
                penguin.activityTime = 3
                penguin.activity = command.activity
                penguin.goal = command.activity
                penguin.activityTarget = coord
                penguin.activityDirection = command['directionNum']     
            } else {      
                penguin.activity = ACTIVITY_NONE  
                penguin.activityDirection = DIRECTION_NONE        
            }
        } else if (command.activity  === ACTIVITY_LOVING && ! penguin.isChild && ! penguin.isOld ) {
            if (penguinsPos[coord] && ! penguinsPos[coord].isChild && ! penguinsPos[coord].isOld ) {
                // # if penguins[coord].activity == ACTIVITY_NONE && penguins[coord].gender != penguin.gender && penguins[coord].age > 4 :
                penguinsPos[coord].activity_time = 3
                penguinsPos[coord].love_time = 10
                penguinsPos[coord].can_love = false
                penguinsPos[coord].activity = command.activity
                penguinsPos[coord].goal = command.activity
                penguin.loveTime = 10
                penguin.canLove = false
                penguin.inLove=true
                penguin.activityTime = 3
                penguin.activity = command.activity
                penguin.goal = command.activity
                penguin.activityTarget = coord
                penguin.activityDirection = command['directionNum']                       
            } else {      
                penguin.activity = ACTIVITY_NONE  
                penguin.activityDirection = DIRECTION_NONE   
            }                     
        } else if (command.activity === ACTIVITY_GETING && ! penguin.isChild && !  penguin.isOld ) {
            if (gemsPos[coord] ) {
                penguin.activityTime = 3  
                penguin.activity = command.activity      
                penguin.goal = command.activity
                penguin.activityTarget = coord
                penguin.activityDirection = command['directionNum']      
            } else {      
                penguin.activity = ACTIVITY_NONE
                penguin.activityDirection = DIRECTION_NONE
            }
        } else if (command.activity === ACTIVITY_CLEANING && ! penguin.isChild && ! penguin.isOld && penguin.hasShowel) {
            if ( garbagesPos[coord] ) {
                penguin.activityTime = 2  
                penguin.activity = command.activity      
                penguin.goal = command.activity
                penguin.activityTarget = coord
                penguin.activityDirection = command['directionNum']      
            } else {      
                penguin.activity = ACTIVITY_NONE
                penguin.activityDirection = DIRECTION_NONE      
            }  
        } else if (command.activity === ACTIVITY_EATING ) {
            if ( penguin.hasFish ) {        
                penguin.activityTime = 2  
                penguin.activity = command.activity
                penguin.goal = command.activity
                penguin.activityDirection = command['directionNum']     
            } else {      
                penguin.activity = ACTIVITY_NONE
                penguin.activityDirection = DIRECTION_NONE
            }
        } else if (command.activity === ACTIVITY_BUILDING && ! penguin.isChild && ! penguin.isOld ) {
            if (penguin.hasGem && cellsPos[direction.vpos][direction.hpos].isSea() ) {      
                penguin.activityTime = 3  
                penguin.activityVPos = direction.vpos
                penguin.activityHPos = direction.hpos
                cellsPos[penguin.activityVPos][penguin.activityHPos].startBuilding()
                penguin.activity = command.activity
                penguin.goal = command.activity
                penguin.activityDirection = command['directionNum']
            } else {      
                penguin.activity = ACTIVITY_NONE    
                penguin.activityDirection = DIRECTION_NONE
            }
        } else {
            penguin.activity = ACTIVITY_NONE    
            penguin.activityDirection = DIRECTION_NONE
        }

        penguin.activityText = ACTIVITY_NAMES[penguin.activity] 
        penguin.commands = []
    }
}