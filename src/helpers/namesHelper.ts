import * as fs from 'fs';
import { getUniqueId } from './idsHelper';
import { PREFIX_NAME } from '../constants';
import { createName } from '../data/repository/createName'
import Name from '../data/model/name'
import { IDBHelper } from './databaseHelper';

export const initiateNames = async (dbHelper: IDBHelper): Promise<void> => {
    console.log("==========> INITIATING")

    const data = fs.readFileSync('./prenoms-hf.txt').toString('utf-8'); {
        for (const line of data.split("\n")) {
            if (line.length > 0) {
                const segs = line.split(',')
                const id = await getUniqueId(dbHelper, PREFIX_NAME)
                const aName = new Name(id, 0, segs[1], segs[0])
                createName(dbHelper, aName)
                console.dir(aName)
            }
        }
    }
}

export const getPersonName = (gender: string): string => {
    const name: string = gender === "m" ? "toto" : "tata";
    return name;
}

export const getIslandName = (): string => {
    const name: string = "Ouessant";
    return name;
}