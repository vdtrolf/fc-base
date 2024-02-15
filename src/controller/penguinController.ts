import Penguin from "../data/model/penguin";
import Cell from "../data/model/cell";

import { randomDirection } from "../helpers/utilHelpers";

import {ACTIVITY_DEAD, ACTIVITY_FLEE, ACTIVITY_BUILDING, ACTIVITY_EATING, ACTIVITY_NONE,ACTIVITY_MOVING,ACTIVITY_CLEANING,ACTIVITY_FISHING,ACTIVITY_GETING,ACTIVITY_LOVING, DIRECTION_NONE, ACTIVITY_NAMES } from "../constants";


//
// makes the penguin move and become older
// age, temperature and hunger increase faster if the evolution_speed raises
// 
export const penguinBecomeOlder = (penguin : Penguin , cellsPos : {}, size:number, penguinsPos : {}, newpenguins : {} , fishesPos : {} , gemsPos: {} ,garbagesPos : {} ,weather: number ,evolution_speed : number ,force : boolean) => {

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
        //         penguin.execute_commands(cells,size,penguins,newpenguins,fishes,gems,garbages)

        // if alive and if the penguin is on smelting ice: try to escape
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


// def execute_commands(self,cells,size,penguins,newpenguins,fishes,gems,garbages):
        
//         # Is there an order to execute
//         if len(self.commands) > 0:
//             command = interpret_commands(self.commands,self.vpos,self.hpos,cells,fishes,gems,garbages)
//             direction = {'vpos':self.vpos + command['vmove'],'hpos':self.hpos + command['hmove']}
//             coord = direction['vpos']*100 + direction['hpos']
//             if command['activity'] == ACTIVITY_MOVING:
//                 if direction['vpos'] > 0 and direction['vpos'] < size and direction['hpos'] > 0 and direction['hpos'] < size and not penguins.get(coord) and not newpenguins.get(coord):
//                     self.vpos = direction['vpos']
//                     self.hpos = direction['hpos']
//                     self.activity = command['activity']
//                     self.goal = command['activity']
//                     self.activity_direction = command['directionNum']
//                     self.activity_time = 1      
//             elif command['activity'] == ACTIVITY_FISHING:
//                 if fishes.get(coord):
//                     fishes[coord].onHook=True
//                     self.activity_time = 3
//                     self.activity = command['activity']
//                     self.goal = command['activity']
//                     self.acivityTarget = coord
//                     self.activity_direction = command['directionNum']     
//                 else:      
//                     self.activity = ACTIVITY_NONE  
//                     self.activity_direction = DIRECTION_NONE        
//             elif command['activity'] == ACTIVITY_LOVING and not self.isChild and not self.isOld:
//                 if penguins.get(coord) and not penguins[coord].isChild and not penguins[coord].isOld:
//                     # if penguins[coord].activity == ACTIVITY_NONE and penguins[coord].gender != self.gender and penguins[coord].age > 4 :
//                     penguins[coord].activity_time = 3
//                     penguins[coord].love_time = 10
//                     penguins[coord].can_love = False
//                     penguins[coord].activity = command['activity']
//                     penguins[coord].goal = command['activity']
//                     self.love_time = 10
//                     self.can_love = False
//                     self.inLove=True
//                     self.activity_time = 3
//                     self.activity = command['activity']
//                     self.goal = command['activity']
//                     self.acivityTarget = coord
//                     self.activity_direction = command['directionNum']                       
//                 else:      
//                     self.activity = ACTIVITY_NONE  
//                     self.activity_direction = DIRECTION_NONE                        
//             elif command['activity'] == ACTIVITY_GETING and not self.isChild and not self.isOld:
//                 if gems.get(coord):
//                     self.activity_time = 3  
//                     self.activity = command['activity']      
//                     self.goal = command['activity']
//                     self.acivityTarget = coord
//                     self.activity_direction = command['directionNum']      
//                 else:      
//                     self.activity = ACTIVITY_NONE
//                     self.activity_direction = DIRECTION_NONE
//             elif command['activity'] == ACTIVITY_CLEANING and not self.isChild and not self.isOld and self.hasShowel:
//                 if garbages.get(coord):
//                     self.activity_time = 2  
//                     self.activity = command['activity']      
//                     self.goal = command['activity']
//                     self.acivityTarget = coord
//                     self.activity_direction = command['directionNum']      
//                 else:      
//                     self.activity = ACTIVITY_NONE
//                     self.activity_direction = DIRECTION_NONE        
//             elif command['activity'] == ACTIVITY_EATING:
//                 if self.hasFish :        
//                     self.activity_time = 2  
//                     self.activity = command['activity']
//                     self.goal = command['activity']
//                     self.activity_direction = command['directionNum']     
//                 else:      
//                     self.activity = ACTIVITY_NONE
//                     self.activity_direction = DIRECTION_NONE
//             elif command['activity'] == ACTIVITY_BUILDING and not self.isChild and not self.isOld:
//                 if self.hasGem and cells[direction['vpos']][direction['hpos']].isSea() :        
//                     self.activity_time = 3  
//                     self.activityVPos = direction['vpos']
//                     self.activityHPos = direction['hpos']
//                     cells[self.activityVPos][self.activityHPos].startBuilding()
//                     self.activity = command['activity']
//                     self.goal = command['activity']
//                     self.activity_direction = command['directionNum']

//                 else:      
//                     self.activity = ACTIVITY_NONE    
//                     self.activity_direction = DIRECTION_NONE
//             else:
//                 self.activity = ACTIVITY_NONE    
//                 self.activity_direction = DIRECTION_NONE

//             self.activity_text = activity_names[self.activity] 
//             self.commands = []