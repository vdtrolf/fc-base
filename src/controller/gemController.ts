import Gem from "../data/model/gem";

// makes the garbage becoming older - sometimes it chnages shape
export const gemBecomeOlder = (gem: Gem) => {

    if (gem.age > 0) {
        gem.age -= 1
    }
}