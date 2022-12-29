"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.setLogLevel = exports.LOGDUMP = exports.LOGDATA = exports.LOGTEXT = exports.LOGALL = exports.LOGERR = exports.LOGINFO = exports.LOGVERB = void 0;
exports.LOGVERB = 0;
exports.LOGINFO = 1;
exports.LOGERR = 2;
exports.LOGALL = 3;
exports.LOGTEXT = 0;
exports.LOGDATA = 1;
exports.LOGDUMP = 2;
const infoRealms = [];
const verbRealms = [];
let allInfoRealms = false;
let allVerbRealms = false;
// default loglevel
let loglevel = exports.LOGERR;
// sets the log level either for all realms or a specific realm 
// log level can be INFO or VERBOSE (ERROR is always displayed)
const setLogLevel = (realm, level = exports.LOGERR) => {
    if (realm === "all" && level === exports.LOGINFO) {
        allInfoRealms = true;
        console.log("logger.js - setLogLevel - adding all to info mode");
    }
    else if (realm === "all" && level === exports.LOGVERB) {
        allVerbRealms = true;
        console.log("logger.js - setLogLevel - adding all to verbose mode");
    }
    else {
        if (level === exports.LOGVERB) {
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
const log = (realm, origclass, origfunction, logtext, level = exports.LOGINFO, logtype = exports.LOGTEXT) => {
    if (level >= loglevel) {
        if (level === exports.LOGERR) {
            console.error(origclass + "-" + origfunction + "\n", logtext);
        }
        else {
            if ((level === exports.LOGINFO && (allInfoRealms || infoRealms.includes(realm))) ||
                (level === exports.LOGVERB && (allVerbRealms || verbRealms.includes(realm)))) {
                if (logtype === exports.LOGTEXT) {
                    console.log(origclass + "-" + origfunction + ": " + logtext);
                }
                else if (logtype === exports.LOGDATA) {
                    console.log(`/ /---- ${origclass} - ${origfunction} -------\\ \\`);
                    console.log(logtext);
                    console.log(`\\ \\---- ${origclass} - ${origfunction} -------/ /`);
                }
                else if (logtype === exports.LOGDUMP) {
                    console.log(logtext);
                }
            }
        }
    }
};
exports.log = log;
//# sourceMappingURL=logger.js.map