export const initiateNames = (): void => {

}

export const getPersonName = (gender: number): string => {
    const name: string = gender === 0 ? "toto" : "tata";
    return name;
}

export const getIslandName = (): string => {
    const name: string = "Ouessant";
    return name;
}