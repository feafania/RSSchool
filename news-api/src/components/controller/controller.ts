import AppLoader from './appLoader';
import { ApiResponse, Callback, NewsArticle, NewsSource } from '../../types';

class AppController extends AppLoader {
    getSources(callback: Callback<ApiResponse<NewsSource>>): void {
        super.getResp({ endpoint: 'sources' }, callback);
    }

    getNews(e: Event, callback: Callback<ApiResponse<NewsArticle>>): void {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;
        while (target !== newsContainer && target !== null) {
            if (target instanceof HTMLElement && newsContainer instanceof HTMLElement) {
                if (target.classList.contains('source__item')) {
                    const sourceId: string | null = target.getAttribute('data-source-id');
                    if (sourceId) {
                        if (newsContainer.getAttribute('data-source') !== sourceId) {
                            newsContainer.setAttribute('data-source', sourceId);
                            super.getResp(
                                {
                                    endpoint: 'everything',
                                    options: {
                                        sources: sourceId,
                                    },
                                },
                                callback
                            );
                        }
                        return;
                    }
                }
                target = target.parentNode;
            }
        }
    }

    searchNews(
        query: string,
        callback: Callback<ApiResponse<NewsArticle>>,
        language: string = 'en',
        sortBy: string = 'publishedAt'
    ): void {
        super.getResp(
            {
                endpoint: 'everything',
                options: {
                    q: query,
                    language,
                    sortBy,
                },
            },
            callback
        );
    }
}

export default AppController;
