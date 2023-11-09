import { LOGVERB, LOGINFO, LOGERR, LOGDATA, LOGTEXT, LOGDUMP } from "../constants"

const infoRealms = [];
const verbRealms = [];
let allInfoRealms :boolean = false;
let allVerbRealms :boolean = false;


// default loglevel
let loglevel : number = LOGERR;

// sets the log level either for all realms or a specific realm 
// log level can be INFO or VERBOSE (ERROR is always displayed)
export const setLogLevel = (realm :string, level : number = LOGERR) => {
  if (realm === "all" && level === LOGINFO) {
    allInfoRealms = true;
    console.log("logger.js - setLogLevel - adding all to info mode");
  } else if (realm === "all" && level === LOGVERB) {
    allVerbRealms = true;
    console.log("logger.js - setLogLevel - adding all to verbose mode");
  } else {
    if (level === LOGVERB) {
      verbRealms.push(realm);
      console.log("logger.js - setLogLevel - adding " + realm + " to verbose mode");
    } else {
      infoRealms.push(realm);
      console.log("logger.js - setLogLevel - adding " + realm + " to info mode");
    }
  }
  if (level < loglevel) loglevel = level;
};

// Log function - based on the realm and the loglevel decides if the log is to be displayed
export const log = (
  realm : string,
  origclass : string,
  origfunction : string,
  logtext : string,
  level : number = LOGINFO,
  logtype : number = LOGTEXT
) => {
  if (level >= loglevel) {
    if (level === LOGERR) {
      console.error(origclass + "-" + origfunction + "\n", logtext);
    } else {
      if (
        (level === LOGINFO && (allInfoRealms || infoRealms.includes(realm))) ||
        (level === LOGVERB && (allVerbRealms || verbRealms.includes(realm)))
      ) {
        if (logtype === LOGTEXT) {
          console.log(origclass + "-" + origfunction + ": " + logtext);
        } else if (logtype === LOGDATA) {
          console.log(`/ /---- ${origclass} - ${origfunction} -------\\ \\`);
          console.log(logtext);
          console.log(`\\ \\---- ${origclass} - ${origfunction} -------/ /`);
        } else if (logtype === LOGDUMP) {
          console.log(logtext);
        }
      }
    }
  }
};