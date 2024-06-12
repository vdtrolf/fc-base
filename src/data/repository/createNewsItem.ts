import NewsItem from "../model/newsItem";
import { IDBHelper } from "../../helpers/databaseHelper"

export const createNewsItem = async (dbHelper: IDBHelper, newsItem: NewsItem) => {
    return await dbHelper.putItem("newsItems", { item: NewsItem }, newsItem.id);
}