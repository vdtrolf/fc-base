import Garbage from "../data/model/garbage";

// makes the garbage becoming older - sometimes it chnages shape
export const garbageBecomeOlder = (garbage: Garbage) => {

    if (Math.floor(Math.random() * 30) === 0) {
        garbage.kind = Math.floor(Math.random() * 4)
    }
}