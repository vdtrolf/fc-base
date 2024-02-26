import Fish from "../data/model/fish";

import { FISH_LETARGY, DIRECTION_NONE } from "../constants";
import { randomDirection } from "../helpers/utilHelpers"


// makes the fish move and become older"""
export const fishBecomeOlder = (fish: Fish, cellsPos: object, fishesPos: object, garbagesPos: object, size: number) => {

    if (!fish.onHook) {
        const move = randomDirection(fish.vpos, fish.hpos)

        if (move.vpos >= 0 && move.vpos < size && move.hpos >= 0 && move.hpos < size) {

            const cellType = cellsPos[move.vpos * 100 + move.hpos].type

            if (Math.floor(Math.random() * FISH_LETARGY) === 0
                && cellType === 0
                && !fishesPos[move.vpos * 100 + move.hpos]
                && !garbagesPos[move.vpos * 100 + move.hpos]) {
                return move
            }
        }
    }
    return { 'vpos': fish.vpos, 'hpos': fish.hpos, 'direction': DIRECTION_NONE }
}