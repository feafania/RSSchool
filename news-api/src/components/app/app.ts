import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        const sourcesItem = document.querySelector('.sources');
        if (sourcesItem instanceof HTMLElement) {
            sourcesItem.addEventListener('click', (e: MouseEvent) => this.controller.getNews(e, this.view.drawNews));
        }
        this.controller.getSources(this.view.drawSources);
    }
}

export default App;
