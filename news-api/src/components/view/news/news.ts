import './news.css';
import { NewsArticle } from '../../../types';

class News {
    private static readonly MAX_NEWS_COUNT = 10;
    public draw(data: NewsArticle[]) {
        // public draw: Callback<NewsArticle[]> = (data) => {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < News.MAX_NEWS_COUNT) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        if (newsItemTemp) {
            news.forEach((item, idx) => {
                const newsClone = newsItemTemp.content.cloneNode(true);
                if (newsClone instanceof DocumentFragment) {
                    const newsItem = newsClone.querySelector('.news__item');
                    if (newsItem instanceof HTMLElement) {
                        if (idx % 2) newsItem.classList.add('alt');
                    }
                    const newsMetaPhoto = newsClone.querySelector('.news__meta-photo');
                    if (newsMetaPhoto instanceof HTMLElement) {
                        newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage ?? '/img/news_placeholder.jpg'})`;
                    }
                    const newsMetaAuthor = newsClone.querySelector('.news__meta-author');
                    if (newsMetaAuthor instanceof HTMLElement) {
                        newsMetaAuthor.textContent = item.author ?? item.source?.name ?? 'Unknown Author';
                    }
                    const newsMetaDate = newsClone.querySelector('.news__meta-date');
                    if (newsMetaDate instanceof HTMLElement) {
                        newsMetaDate.textContent =
                            item.publishedAt?.slice(0, 10).split('-').reverse().join('-') ?? 'Unknown Published';
                    }
                    const newsDescriptionTitle = newsClone.querySelector('.news__description-title');
                    if (newsDescriptionTitle instanceof HTMLElement) {
                        newsDescriptionTitle.textContent = item.title ?? 'Unknown Description';
                    }
                    const newsDescriptionSource = newsClone.querySelector('.news__description-source');
                    if (newsDescriptionSource instanceof HTMLElement) {
                        newsDescriptionSource.textContent = item.source?.name ?? 'Unknown Description source';
                    }
                    const newsDescriptionContent = newsClone.querySelector('.news__description-content');
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

        const newsContainer = document.querySelector('.news');
        if (newsContainer instanceof HTMLElement) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
