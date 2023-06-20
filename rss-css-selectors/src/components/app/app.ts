import { getElement } from '../../functions/functions';
import AppController from '../controller/appController';
import AppView from '../view/appview';

class App {
    controller: AppController;
    view: AppView;
    level: number;

    constructor() {
        this.level = 0;
        this.controller = new AppController();
        this.view = new AppView(0);
    }

    start() {
        this.controller.method1();
        this.view.drawBoard(this.level);
        this.view.drawMenu();

        const buttonLeft = getElement('.menu__button-left');
        const buttonRight = getElement('.menu__button-right');
        buttonLeft.addEventListener('click', () => {
            this.prevLevel();
        });
        buttonRight.addEventListener('click', () => {
            this.nextLevel();
        });
    }
    nextLevel() {
        this.level += 1;
        this.view.drawBoard(this.level);
    }
    prevLevel() {
        this.level -= 1;
        this.view.drawBoard(this.level);
    }
}

export default App;
