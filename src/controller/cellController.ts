import Cell from "../data/model/cell";

import { WEATHER_SUN, WEATHER_RAIN, WEATHER_SNOW } from "../constants";


export const cellBecomeOlder = (cell: Cell, cells: { [key: number]: Cell }, size: number, weather: number, evolutionSpeed: number) => {
    let smeltFactor = 6 - evolutionSpeed

    if (cell.vpos === 0 || cells[(cell.vpos - 1) * 100 + cell.hpos].type > 0)
        smeltFactor += 1
    if (cell.vpos === size - 1 || cells[(cell.vpos + 1) * 100 + cell.hpos].type > 0)
        smeltFactor += 1
    if (cell.hpos === 0 || cells[cell.vpos * 100 + cell.hpos - 1].type > 0)
        smeltFactor += 1
    if (cell.hpos === size - 1 || cells[cell.vpos * 100 + cell.hpos + 1].type > 0)
        smeltFactor += 1

    if (weather === WEATHER_SUN && cell.type > 0 && cell.type < 12 && Math.floor(Math.random() * smeltFactor) === 0) {
        cell.type -= 1
    } else if (weather === WEATHER_RAIN && cell.type > 0 && cell.type < 12 && Math.floor(Math.random() * smeltFactor * 2) === 0) {
        cell.type -= 1
    } else if (weather === WEATHER_SNOW && cell.type > 0 && cell.type < 11 && Math.floor(Math.random() * (2 + evolutionSpeed / 2)) === 0) {
        cell.type += 1
    }

    if (cell.beingBuilt && cell.type < 12) {
        cell.type += 2
    }


}