import Story from "../model/story";
import { IDBHelper } from "../../helpers/databaseHelper"

export const createStory = async (dbHelper: IDBHelper, story: Story) => {
    return await dbHelper.putItem("stories", { item: story }, story.id);
}