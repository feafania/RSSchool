import './news.css';
import { NewsArticle } from '../../../types';

class News {
    private static readonly MAX_NEWS_COUNT = 12;
    public draw(data: NewsArticle[]): void {
        const news: NewsArticle[] =
            data.length >= 10
                ? data.filter((_item: NewsArticle, idx: number): boolean => idx < News.MAX_NEWS_COUNT)
                : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        if (newsItemTemp) {
            news.forEach((item: NewsArticle, idx: number): void => {
                const newsClone: Node = newsItemTemp.content.cloneNode(true);
                if (newsClone instanceof DocumentFragment) {
                    const newsItem: Element | null = newsClone.querySelector('.news__item');
                    if (newsItem instanceof HTMLElement) {
                        if (idx % 2) newsItem.classList.add('alt');
                    }
                    const newsMetaPhoto: Element | null = newsClone.querySelector('.news__meta-photo');
                    if (newsMetaPhoto instanceof HTMLElement) {
                        newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage ?? '/img/news_placeholder.jpg'})`;
                    }
                    const newsMetaAuthor: Element | null = newsClone.querySelector('.news__meta-author');
                    if (newsMetaAuthor instanceof HTMLElement) {
                        newsMetaAuthor.textContent = item.author ?? item.source?.name ?? 'Unknown Author';
                    }
                    const newsMetaDate: Element | null = newsClone.querySelector('.news__meta-date');
                    if (newsMetaDate instanceof HTMLElement) {
                        newsMetaDate.textContent =
                            item.publishedAt?.slice(0, 10).split('-').reverse().join('-') ?? 'Unknown Published';
                    }
                    const newsDescriptionTitle: Element | null = newsClone.querySelector('.news__description-title');
                    if (newsDescriptionTitle instanceof HTMLElement) {
                        newsDescriptionTitle.textContent = item.title ?? 'Unknown Description';
                    }
                    const newsDescriptionSource: Element | null = newsClone.querySelector('.news__description-source');
                    if (newsDescriptionSource instanceof HTMLElement) {
                        newsDescriptionSource.textContent = item.source?.name ?? 'Unknown Description source';
                    }
                    const newsDescriptionContent: Element | null =
                        newsClone.querySelector('.news__description-content');
                    if (newsDescriptionContent instanceof HTMLElement) {
                        newsDescriptionContent.textContent = item.description ?? 'Unknown Description source';
                    }
                    const newsHref = newsClone.querySelector('.news__read-more a');
                    if (newsHref instanceof HTMLAnchorElement && item.url) {
                        newsHref.setAttribute('href', item.url);
                    }
                    fragment.append(newsClone);
                }
            });
        }

        const newsContainer: Element | null = document.querySelector('.news');
        if (newsContainer instanceof HTMLElement) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
