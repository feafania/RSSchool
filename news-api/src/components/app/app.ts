import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import setupSearch from '../search/search';

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesItem: Element | null = document.querySelector('.sources');
        if (sourcesItem instanceof HTMLElement) {
            sourcesItem.addEventListener('click', (e: MouseEvent) => this.controller.getNews(e, this.view.drawNews));
        }
        this.controller.getSources(this.view.drawSources);
        setupSearch(this.searchArticles.bind(this));
    }

    private searchArticles(query: string): void {
        if (query.trim() !== '') {
            this.controller.searchNews(query, this.view.drawNews);
        }
    }
}

export default App;
