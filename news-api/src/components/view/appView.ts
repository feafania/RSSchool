import News from './news/news';
import Sources from './sources/sources';
import { ApiResponse, Callback, NewsArticle, NewsSource } from '../../types';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews: Callback<ApiResponse<NewsArticle>> = (data) => {
        const values: NewsArticle[] = (data?.articles ?? []).slice();
        this.news.draw(values);
    };

    public drawSources: Callback<ApiResponse<NewsSource>> = (data) => {
        const values: NewsSource[] = (data?.sources ?? []).slice();
        this.sources.draw(values);
    };
}

export default AppView;
