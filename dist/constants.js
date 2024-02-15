"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.letters = exports.weathers = exports.ACTIVITY_NAMES = exports.DIRECTION_NAMES = exports.MOVES = exports.SEASON_WINTER = exports.SEASON_AUTUMN = exports.SEASON_SUMMER = exports.SEASON_SPRING = exports.DIRECTION_DOWN = exports.DIRECTION_UP = exports.DIRECTION_RIGHT = exports.DIRECTION_LEFT = exports.DIRECTION_NONE = exports.ACTIVITY_DEAD = exports.ACTIVITY_FLEE = exports.ACTIVITY_CLEANING = exports.ACTIVITY_MOVING = exports.ACTIVITY_BUILDING = exports.ACTIVITY_GETING = exports.ACTIVITY_LOVING = exports.ACTIVITY_FISHING = exports.ACTIVITY_EATING = exports.ACTIVITY_NONE = exports.FISH_LETARGY = exports.WEATHER_SNOW = exports.WEATHER_COLD = exports.WEATHER_SUN = exports.WEATHER_RAIN = exports.PROBABILITY_RISE = exports.PROBABILITY_SMELT = exports.NAME_TYPE_ISLAND = exports.NAME_TYPE_PERSON = exports.PREFIX_CELL = exports.PREFIX_GARBAGE = exports.PREFIX_GEM = exports.PREFIX_FISH = exports.PREFIX_PENGUIN = exports.PREFIX_ISLAND = exports.BOARDSIZE = exports.LOGDUMP = exports.LOGDATA = exports.LOGTEXT = exports.LOGALL = exports.LOGERR = exports.LOGINFO = exports.LOGVERB = void 0;
exports.LOGVERB = 0;
exports.LOGINFO = 1;
exports.LOGERR = 2;
exports.LOGALL = 3;
exports.LOGTEXT = 0;
exports.LOGDATA = 1;
exports.LOGDUMP = 2;
exports.BOARDSIZE = 6;
exports.PREFIX_ISLAND = 1;
exports.PREFIX_PENGUIN = 2;
exports.PREFIX_FISH = 3;
exports.PREFIX_GEM = 4;
exports.PREFIX_GARBAGE = 5;
exports.PREFIX_CELL = 6;
exports.NAME_TYPE_PERSON = 1;
exports.NAME_TYPE_ISLAND = 9;
exports.PROBABILITY_SMELT = 3;
exports.PROBABILITY_RISE = 4;
exports.WEATHER_RAIN = 0;
exports.WEATHER_SUN = 1;
exports.WEATHER_COLD = 2;
exports.WEATHER_SNOW = 3;
exports.FISH_LETARGY = 3;
exports.ACTIVITY_NONE = 0;
exports.ACTIVITY_EATING = 1;
exports.ACTIVITY_FISHING = 2;
exports.ACTIVITY_LOVING = 3;
exports.ACTIVITY_GETING = 4;
exports.ACTIVITY_BUILDING = 5;
exports.ACTIVITY_MOVING = 6;
exports.ACTIVITY_CLEANING = 7;
exports.ACTIVITY_FLEE = 8;
exports.ACTIVITY_DEAD = 9;
exports.DIRECTION_NONE = 0;
exports.DIRECTION_LEFT = 1;
exports.DIRECTION_RIGHT = 2;
exports.DIRECTION_UP = 3;
exports.DIRECTION_DOWN = 4;
exports.SEASON_SPRING = 1;
exports.SEASON_SUMMER = 2;
exports.SEASON_AUTUMN = 3;
exports.SEASON_WINTER = 4;
exports.MOVES = [[0, 0], [0, -1], [0, 1], [-1, 0], [1, 0]];
exports.DIRECTION_NAMES = {
    DIRECTION_UP: "up",
    DIRECTION_DOWN: "down",
    DIRECTION_LEFT: "left",
    DIRECTION_RIGHT: "right"
};
exports.ACTIVITY_NAMES = {
    ACTIVITY_NONE: "",
    ACTIVITY_EATING: "Eating",
    ACTIVITY_FISHING: "Fishing",
    ACTIVITY_LOVING: "Loving",
    ACTIVITY_GETING: "Diging",
    ACTIVITY_BUILDING: "Building",
    ACTIVITY_MOVING: "Going",
    ACTIVITY_CLEANING: "Cleaning",
    ACTIVITY_DEAD: "Dead"
};
exports.weathers = {
    WEATHER_SUN: 'Sun',
    WEATHER_RAIN: 'Rain',
    WEATHER_SNOW: 'Snow',
    WEATHER_COLD: 'Cold'
};
exports.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
// names_males = []
// names_females = []
// names_islands = []
// events_log = []
// keys = []
// def initiate_names():
//     """Reads the names into the _male, _female and _islands lists"""
//     names_file = open('prenoms-hf.txt',
//                       encoding="latin-1",
//                       errors="surrogateescape")
//     for entry in names_file:
//         words = entry.rstrip().split(',')
//         if len(words) > 1:
//             if words[1] == 'm' and len(words[0]) < 9:
//                 names_males.append(words[0])
//             elif words[1] == 'f' and len(words[0]) < 9:
//                 names_females.append(words[0])
//     islands_file = open('iles.txt',
//                         encoding="latin-1",
//                         errors="surrogateescape")
//     for entry in islands_file:
//         names_islands.append(entry.rstrip())
// def random_direction(vpos, hpos):
//     """Returns a random direction in the form of vpos/hpos coords"""
//     direction = random.randint(0, 3) + 1
//     move = moves[direction]
//     return {'vpos': vpos + move[0], 'hpos': hpos + move[1], 'direction': direction, 'directionNum' : direction}
// def random_weather(year, weather, weather_age, force=False):
//     """Returns a random weather inspired by the season in the form of weather number + name"""
//     season_weather = int(year * 4) % 4
//     if force or (weather != season_weather and (random.randint(0, 3) == 0 or weather_age > 8)):
//         new_weather = season_weather
//         return [new_weather, 0, weathers[new_weather]]
//     else:
//         return [weather, weather_age + 1, weathers[weather]]
// def generate_penguin_name(gender):
//     """Generates and returns a name for the given gender"""
//     if gender == "M":
//         return names_males[random.randint(0, len(names_males))]
//     else:
//         return names_females[random.randint(0, len(names_females))]
// def generate_island_name():
//     """Generates and returns an island name"""
//     return names_islands[random.randint(0, len(names_islands) - 1)]
// def get_next_key():
//     """Returns the next available key"""
//     while True :
//         key = random.randint(0,999999) 
//         if not key in keys:
//             keys.append(key)
//             return key
// def convert_to_alpha(number):
//     """Converts a number to an alphannumeric representation"""
//     if number < 10:
//         return str(number)
//     elif number < 36:
//         return letters[number - 10]
//     return '?'
//# sourceMappingURL=constants.js.map