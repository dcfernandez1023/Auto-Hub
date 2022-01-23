import { useState, useEffect, useCallback } from 'react';
import { NewsController } from '../../controllers/NewsController';
import { json } from '../../custom_types/json';
import { News } from '../../models/News';
const CONTROLLER: NewsController = new NewsController();

const NewsService = () => {
    const[news, setNews] = useState<News[]>();
    const[newsError, setNewsError] = useState<boolean>(false);

    const getNewsCallback = (news: json) => {
        if(news.articles === undefined) {
            setNewsError(true);
        }
        setNews(news.articles);
    }

    const onGetNewsError = (error: any) => {
        setNewsError(true);
    }

    const getNews = useCallback(() => {
        CONTROLLER.getNews(getNewsCallback, onGetNewsError);
    }, [])

    useEffect(() => {
        console.log("in the news service component");
        getNews();
    }, [getNews])

    return {
        news,
        newsError
    }
}

export default NewsService;