export const initiateNames = (): void => {

}

export const getPersonName = (gender: string): string => {
    const name: string = gender === "m" ? "toto" : "tata";
    return name;
}

export const getIslandName = (): string => {
    const name: string = "Ouessant";
    return name;
}