class NewsController {
    private static NEWS_COLLECTION = "newsV2";
    private db = require("../dal/db.ts");
    private static DOC_ID: string = "auto-hub-news";

    public getNews = (callback: Function, onError: Function): void => {
        try {
            this.db.getByDocId(NewsController.DOC_ID, NewsController.NEWS_COLLECTION, callback, onError);
        }
        catch(error: any) {
            onError(error);
        }
    }
}

export { NewsController };
