// import { item } from "../data/model/itemInterface"

export interface IDBHelper {
    local: boolean;
    debug: boolean;
    realm: string;
    source: string;

    createDb: (local: boolean) => Promise<void>;
    cleanDb: () => boolean;
    putItem: (tableName: string, item, uniqueId: number) => boolean;
    getItem: (tableName: string, uniqueId: string) => object;
    getAsyncItems: (
        tableName: string,
        filterIdx?: string,
        filterComparator?: string,
        filterVal?: number
    ) => Promise<[]>;
    deleteItem: (tableName: string, uniqueId: string) => boolean;
}