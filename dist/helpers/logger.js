"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.setLogLevel = void 0;
const constants_1 = require("../constants");
const infoRealms = [];
const verbRealms = [];
let allInfoRealms = false;
let allVerbRealms = false;
// default loglevel
let loglevel = constants_1.LOGERR;
// sets the log level either for all realms or a specific realm 
// log level can be INFO or VERBOSE (ERROR is always displayed)
const setLogLevel = (realm, level = constants_1.LOGERR) => {
    if (realm === "all" && level === constants_1.LOGINFO) {
        allInfoRealms = true;
        console.log("logger.js - setLogLevel - adding all to info mode");
    }
    else if (realm === "all" && level === constants_1.LOGVERB) {
        allVerbRealms = true;
        console.log("logger.js - setLogLevel - adding all to verbose mode");
    }
    else {
        if (level === constants_1.LOGVERB) {
            verbRealms.push(realm);
            console.log("logger.js - setLogLevel - adding " + realm + " to verbose mode");
        }
        else {
            infoRealms.push(realm);
            console.log("logger.js - setLogLevel - adding " + realm + " to info mode");
        }
    }
    if (level < loglevel)
        loglevel = level;
};
exports.setLogLevel = setLogLevel;
// Log function - based on the realm and the loglevel decides if the log is to be displayed
const log = (realm, origclass, origfunction, logtext, level = constants_1.LOGINFO, logtype = constants_1.LOGTEXT) => {
    if (level >= loglevel) {
        if (level === constants_1.LOGERR) {
            console.error(origclass + "-" + origfunction + "\n", logtext);
        }
        else {
            if ((level === constants_1.LOGINFO && (allInfoRealms || infoRealms.includes(realm))) ||
                (level === constants_1.LOGVERB && (allVerbRealms || verbRealms.includes(realm)))) {
                if (logtype === constants_1.LOGTEXT) {
                    console.log(origclass + "-" + origfunction + ": " + logtext);
                }
                else if (logtype === constants_1.LOGDATA) {
                    console.log(`/ /---- ${origclass} - ${origfunction} -------\\ \\`);
                    console.log(logtext);
                    console.log(`\\ \\---- ${origclass} - ${origfunction} -------/ /`);
                }
                else if (logtype === constants_1.LOGDUMP) {
                    console.log(logtext);
                }
            }
        }
    }
};
exports.log = log;
//# sourceMappingURL=logger.js.map