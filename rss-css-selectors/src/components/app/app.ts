import AppController from '../controller/appController';
import AppView from '../view/appview';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        console.log('start');
        this.controller.method1();
        this.view.drawBoard();
    }
}

export default App;
