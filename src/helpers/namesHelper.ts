import * as fs from 'fs';

export const initiateNames = (): void => {
    const words = fs.readFileSync('./prenoms-hf.txt', 'utf-8');
    console.log(words)
}

export const getPersonName = (gender: string): string => {
    const name: string = gender === "m" ? "toto" : "tata";
    return name;
}

export const getIslandName = (): string => {
    const name: string = "Ouessant";
    return name;
}