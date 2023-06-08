import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '615f148c6f6d4d39868811b11876f3e9', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
