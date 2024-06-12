import NewsItem from "../model/newsItem";

export const getNewsItem = async (dbHelper, id): Promise<NewsItem> => {

    const newsItem: NewsItem = (await dbHelper.getItem("newsItems", id)) as unknown as NewsItem;
    return newsItem;
}