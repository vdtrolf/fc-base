import Cell from "./cell";
import Fish from "./fish";
import Garbage from "./garbage";
import Gem from "./gem";
import Penguin from "./penguin"
import Island from "./island"
import Name from "./name";
import User from "./user"
import Score from "./score"


export interface item {
    item: Cell | Fish | Garbage | Gem | Penguin | Island | Name | User | Score,
}

export type itemCollection = { [key: number]: Cell | Fish | Garbage | Gem | Penguin | Island }

export type islandExtract = {
    id: number;
    key: number;
    size: number;
    name: string;
    year: number;
}