import AppLoader from './appLoader';
import { ApiResponse, Callback, NewsArticle, NewsSource } from '../../types';

class AppController extends AppLoader {
    getSources(callback: Callback<ApiResponse<NewsSource>>) {
        super.getResp({ endpoint: 'sources' }, callback);
    }

    getNews(e: Event, callback: Callback<ApiResponse<NewsArticle>>) {
        let target = e.target;
        const newsContainer = e.currentTarget;
        while (target !== newsContainer && target !== null) {
            if (target instanceof HTMLElement && newsContainer instanceof HTMLElement) {
                if (target.classList.contains('source__item')) {
                    const sourceId = target.getAttribute('data-source-id');
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
}

export default AppController;
