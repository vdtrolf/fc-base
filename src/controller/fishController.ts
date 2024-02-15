import Fish from "../data/model/fish";
import Cell from "../data/model/cell"

import { FISH_LETARGY, DIRECTION_NONE } from "../constants";
import { randomDirection } from "../helpers/utilHelpers"


// makes the fish move and become older"""
export const fishBecomeOlder = (fish : Fish, cellsPos: {}, fishesPos : {}, garbagesPos : {} ,size : number) => {

    if ( ! fish.onHook) {
        let move = randomDirection(fish.vpos,fish.hpos)

        if (move.vpos >= 0 && move.vpos < size && move.hpos >= 0 && move.hpos < size) {

            let cellType = cellsPos[move.vpos * 100 + move.hpos]

            if ( Math.floor(Math.random() * FISH_LETARGY) == 0 
                && cellType == 0 
                && ! fishesPos[move.vpos*100 + move.hpos] 
                && ! garbagesPos[move.vpos*100 + move.hpos]) {
                return move
            }
        } 
    }
    return {'vpos':fish.vpos,'hpos':fish.hpos,'direction':DIRECTION_NONE}
}