export const LOGVERB = 0;
export const LOGINFO = 1;
export const LOGERR = 2;
export const LOGALL = 3;
export const LOGTEXT = 0;
export const LOGDATA = 1;
export const LOGDUMP = 2;

export const BOARDSIZE = 6

export const PREFIX_ISLAND = 1
export const PREFIX_PENGUIN = 2
export const PREFIX_FISH = 3
export const PREFIX_GEM = 4
export const PREFIX_GARBAGE = 5
export const PREFIX_CELL = 6

export const NAME_TYPE_PERSON = 1
export const NAME_TYPE_ISLAND = 9

export const PROBABILITY_SMELT = 3
export const PROBABILITY_RISE = 4

export const WEATHER_RAIN = 0
export const WEATHER_SUN = 1
export const WEATHER_COLD = 2
export const WEATHER_SNOW = 3

export const FISH_LETARGY = 3

export const ACTIVITY_NONE = 0
export const ACTIVITY_EATING = 1
export const ACTIVITY_FISHING = 2
export const ACTIVITY_LOVING = 3
export const ACTIVITY_GETING = 4
export const ACTIVITY_BUILDING = 5
export const ACTIVITY_MOVING = 6
export const ACTIVITY_CLEANING = 7
export const ACTIVITY_FLEE = 8
export const ACTIVITY_DEAD = 9

export const DIRECTION_NONE = 0
export const DIRECTION_LEFT = 1
export const DIRECTION_RIGHT = 2
export const DIRECTION_UP = 3
export const DIRECTION_DOWN = 4

export const SEASON_SPRING = 1
export const SEASON_SUMMER = 2
export const SEASON_AUTUMN = 3
export const SEASON_WINTER = 4

export const MOVES = [[0, 0], [0, -1], [0, 1], [-1, 0], [1, 0]]

export const DIRECTION_NAMES = [
    "up",
    "down",
    "left",
    "right"
]

export const ACTIVITY_NAMES = [
    "",
    "Eating",
    "Fishing",
    "Loving",
    "Diging",
    "Building",
    "Going",
    "Cleaning",
    "Dead"]

export const weathers = [
    'Sun',
    'Rain',
    'Snow',
    'Cold'
]

export const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]


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
//             if words[1] === 'm' and len(words[0]) < 9:
//                 names_males.append(words[0])
//             elif words[1] === 'f' and len(words[0]) < 9:
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

//     if force or (weather != season_weather and (random.randint(0, 3) === 0 or weather_age > 8)):
//         new_weather = season_weather
//         return [new_weather, 0, weathers[new_weather]]
//     else:
//         return [weather, weather_age + 1, weathers[weather]]


// def generate_penguin_name(gender):
//     """Generates and returns a name for the given gender"""
//     if gender === "M":
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


