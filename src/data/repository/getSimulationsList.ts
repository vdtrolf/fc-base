
export const getSimulationsList = async (dbHelper) => {

    const simulations = (await dbHelper.getAsyncItems("simulations")) as unknown;
    return simulations;

}
