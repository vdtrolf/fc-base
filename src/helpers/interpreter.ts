
import {
    DIRECTION_UP, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_NONE,
    ACTIVITY_BUILDING, ACTIVITY_MOVING, ACTIVITY_CLEANING, ACTIVITY_FISHING, ACTIVITY_GETING, ACTIVITY_NONE, ACTIVITY_LOVING, ACTIVITY_EATING,
    MOVES, ACTIVITY_NAMES, DIRECTION_NAMES
} from "../constants";


//Returns a direction based on an order - in the form of vpos/hpos coords//
export const getDirection = (command: string, activity: number) => {

    // console.log(">>>>>>>>>>>>>>>>> COMMAND  => " + command)
    // console.log(">>>>>>>>>>>>>>>>> ACTIVITY => " + activity)

    if (command.toUpperCase()[0] === "U") {
        const move = MOVES[DIRECTION_UP]
        return {
            'activity': activity,
            'activityName': ACTIVITY_NAMES[activity],
            'directionNum': DIRECTION_UP,
            'vmove': move[0],
            'hmove': move[1],
            'directionName': DIRECTION_NAMES[DIRECTION_UP]
        }
    } else if (command.toUpperCase()[0] === "D") {
        const move = MOVES[DIRECTION_DOWN]
        return {
            'activity': activity,
            'activityName': ACTIVITY_NAMES[activity],
            'directionNum': DIRECTION_DOWN,
            'vmove': move[0],
            'hmove': move[1],
            'directionName': DIRECTION_NAMES[DIRECTION_DOWN]
        }
    } else if (command.toUpperCase()[0] === "L") {
        const move = MOVES[DIRECTION_LEFT]
        return {
            'activity': activity,
            'activityName': ACTIVITY_NAMES[activity],
            'directionNum': DIRECTION_LEFT,
            'vmove': move[0],
            'hmove': move[1],
            'directionName': DIRECTION_NAMES[DIRECTION_LEFT]
        }
    } else if (command.toUpperCase()[0] === "R") {
        const move = MOVES[DIRECTION_RIGHT]
        return {
            'activity': activity,
            'activityName': ACTIVITY_NAMES[activity],
            'directionNum': DIRECTION_RIGHT,
            'vmove': move[0],
            'hmove': move[1],
            'directionName': DIRECTION_NAMES[DIRECTION_RIGHT]
        }
    }
}

export const findItem = (vpos: number, hpos: number, items: object) => {
    // //
    for (let direction = 0; direction < 4; direction++) {
        const coord = (vpos + MOVES[direction][0]) * 100 + hpos + MOVES[direction][1]
        if (items[coord])
            return direction
    }
    return -1
}


export const interpretCommands = (commands: string[], vpos: number, hpos: number, cellsPos: object, fishesPos: object, gemsPos: object, garbagesPos: object) => {


    //returns the given activity as a CONSTANT value//

    if (commands.length === 1) {
        if (commands[0].toUpperCase()[0] === "E") {
            return {
                'activity': ACTIVITY_EATING,
                'activityName': ACTIVITY_NAMES[ACTIVITY_EATING],
                'vmove': 0,
                'hmove': 0,
                'directionName': '',
                'directionNum': DIRECTION_NONE
            }
        } else if (commands[0].toUpperCase()[0] === "F") {
            const foundDirection = findItem(vpos, hpos, fishesPos)
            if (foundDirection >= 0) {
                const move = MOVES[foundDirection]
                return {
                    'activity': ACTIVITY_FISHING,
                    'activityName': ACTIVITY_NAMES[ACTIVITY_FISHING],
                    'directionNum': foundDirection,
                    'vmove': move[0],
                    'hmove': move[1],
                    'directionName': DIRECTION_NAMES[foundDirection]
                }
            }
        } else {
            const direction = getDirection(commands[0], ACTIVITY_MOVING)

            if (fishesPos[(vpos + direction.vmove) * 100 + hpos + direction.hmove]) {
                direction.activity = ACTIVITY_FISHING
                direction.activityName = ACTIVITY_NAMES[ACTIVITY_FISHING]
            } else if (gemsPos[(vpos + direction.vmove) * 100 + hpos + direction.hmove]) {
                direction.activity = ACTIVITY_GETING
                direction.activityName = ACTIVITY_NAMES[ACTIVITY_GETING]
            } else if (garbagesPos[(vpos + direction.vmove) * 100 + hpos + direction.hmove]) {
                direction.activity = ACTIVITY_CLEANING
                direction.activityName = ACTIVITY_NAMES[ACTIVITY_CLEANING]
            } else if (cellsPos[(vpos + direction.vmove) * 100 + hpos + direction.hmove].type === 0) {
                direction.activity = ACTIVITY_BUILDING
                direction.activityName = ACTIVITY_NAMES[ACTIVITY_BUILDING]
            }

            console.dir(direction)

            return direction
        }

    } else if (commands.length === 2) {
        if (commands[0].toUpperCase()[0] === "F") {
            return getDirection(commands[1], ACTIVITY_FISHING)
        } else if (commands[0].toUpperCase()[0] === "G") {
            return getDirection(commands[1], ACTIVITY_GETING)
        } else if (commands[0].toUpperCase()[0] === "B") {
            return getDirection(commands[1], ACTIVITY_BUILDING)
        } else if (commands[0].toUpperCase()[0] === "K") {
            return getDirection(commands[1], ACTIVITY_LOVING)
        } else if (commands[0].toUpperCase()[0] === "C") {
            return getDirection(commands[1], ACTIVITY_CLEANING)
        }
    }
    return {
        'activity': ACTIVITY_NONE,
        'activityName': '',
        'vmove': 0,
        'hmove': 0,
        'directionName': '',
        'directionNum': DIRECTION_NONE
    }
}