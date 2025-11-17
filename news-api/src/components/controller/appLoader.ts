import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super(process.env.API_URL || 'https://rss-news-api.onrender.com/', {
            apiKey: process.env.API_KEY || '6a8728a65101493fb96469cbdc022417',
        });
    }
}

export default AppLoader;
