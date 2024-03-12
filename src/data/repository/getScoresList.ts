
export const getScoresList = async (dbHelper) => {

    const scores = (await dbHelper.getAsyncItems("scores")) as unknown;
    return scores;

}
