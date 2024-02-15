import { WEATHER_SUN, WEATHER_COLD, WEATHER_SNOW, WEATHER_RAIN, MOVES } from "../constants";

const weathers = {
    WEATHER_SUN: 'Sun',
    WEATHER_RAIN: 'Rain',
    WEATHER_SNOW: 'Snow',
    WEATHER_COLD: 'Cold'
}



// Returns a random weather inspired by the season in the form of weather number + name"""
export const randomWeather = (year :number, weather: number, weatherAge: number, force : boolean =false) => {

    let season_weather = (Math.floor(year) * 4) % 4

    if (force || (weather != season_weather && (Math.floor(Math.random() * 3) == 0 || weatherAge > 8))) {
        let new_weather = season_weather
        return [new_weather, 0, weathers[new_weather]]
    } else {
        return [weather, weatherAge + 1, weathers[weather]]
    }
}

//Returns a random direction in the form of vpos/hpos coords"""
export const randomDirection = (vpos : number, hpos:number ) => {
    let direction = Math.floor(Math.random() *  4 ) + 1
    let move = MOVES[direction]
    return {'vpos': vpos + move[0], 'hpos': hpos + move[1], 'direction': direction}
}