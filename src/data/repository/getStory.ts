import Story from "../model/story";

export const getStory = async (dbHelper, id): Promise<Story> => {

    const story: Story = (await dbHelper.getItem("stories", id)) as unknown as Story;
    return story;
}