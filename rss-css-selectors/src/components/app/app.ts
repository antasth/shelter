import levels from '../../data/levels';
import { getElement } from '../../functions/functions';
import AppController from '../controller/appController';
import AppView from '../view/appview';

class App {
    private controller: AppController;
    private view: AppView;
    private level: number;

    constructor() {
        this.level = 0;
        this.controller = new AppController();
        this.view = new AppView(0);
    }

    public start(): void {
        this.controller.method1();
        this.view.drawBoard(this.level);
        this.view.drawMenu(this.level);
        this.view.drawEditor();
        this.addListenersToNavButtons();
    }
    private nextLevel(): void {
        if (this.level < levels.length - 1) {
            this.level += 1;
            this.view.drawBoard(this.level);
            this.view.drawMenu(this.level);
            this.view.createHtmlContent(this.level);
            this.addListenersToNavButtons();
        }
    }
    private prevLevel(): void {
        if (this.level > 0) {
            this.level -= 1;
            this.view.drawBoard(this.level);
            this.view.drawMenu(this.level);
            this.view.createHtmlContent(this.level);
            this.addListenersToNavButtons();
        }
    }
    private addListenersToNavButtons(): void {
        const buttonLeft = getElement('.menu__button-left');
        const buttonRight = getElement('.menu__button-right');
        buttonLeft.addEventListener('click', () => {
            this.prevLevel();
        });
        buttonRight.addEventListener('click', () => {
            this.nextLevel();
        });
    }
}

export default App;
