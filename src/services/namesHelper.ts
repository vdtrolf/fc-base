export const initiateNames= () : void => {

} 

export const getPersonName = (gender:number) : string => {
    let name : string = gender === 0 ? "toto" : "tata";
    return name;
}

export const getIslandName = () : string => {
    let name : string = "Ouessant";
    return name;
}