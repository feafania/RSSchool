import News from './news/news';
import Sources from './sources/sources';
import { ApiResponse, NewsArticle, NewsSource } from '../../types';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: ApiResponse<NewsArticle>) {
        const values: NewsArticle[] = (data?.articles ?? []).slice();
        this.news.draw(values);
    }

    public drawSources(data: ApiResponse<NewsSource>) {
        const values: NewsSource[] = (data?.sources ?? []).slice();
        this.sources.draw(values);
    }
}

export default AppView;
