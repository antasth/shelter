import levels from '../../../data/levels';
import { getElement } from '../../../functions/functions';
import AppView from '../../view/appview';
import Submit from './submit';

class NavButtonListeners {
    private view: AppView;
    private level: number;
    private submit: Submit;

    constructor(level: number) {
        this.view = new AppView(0);
        this.submit = new Submit();
        this.level = level;
    }
    public nextLevel(level: number): void {
        this.level = level;
        if (this.level < levels.length - 1) {
            this.level += 1;
            this.view.drawBoard(this.level);
            this.view.drawMenu(this.level);
            this.view.createHtmlContent(this.level);
            this.addListenersToNavButtons();
        }
    }
    public prevLevel(level: number): void {
        this.level = level;
        if (this.level > 0) {
            this.level -= 1;
            this.view.drawBoard(this.level);
            this.view.drawMenu(this.level);
            this.view.createHtmlContent(this.level);
            this.addListenersToNavButtons();
        }
    }
    public addListenersToNavButtons(): void {
        const buttonLeft = getElement('.menu__button-left');
        const buttonRight = getElement('.menu__button-right');
        buttonLeft.addEventListener('click', () => {
            this.prevLevel(this.level);
        });
        buttonRight.addEventListener('click', () => {
            this.nextLevel(this.level);
        });
        const submitBtn = getElement('.editor__button');
        submitBtn.addEventListener('click', () => {
            if (this.submit.checkAnswer(this.level)) {
                this.nextLevel(this.level);
                this.submit.clearInput();
            }
        });
    }
}
export default NavButtonListeners;
