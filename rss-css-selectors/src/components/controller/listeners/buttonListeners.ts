import levels from '../../../data/levels';
import { getElement } from '../../../functions/functions';
import AppView from '../../view/appview';
import HoverListeners from './hoverListeners';
import Submit from './submit';

class ButtonListeners {
    private view: AppView;
    private submit: Submit;
    private level: number;
    private hover: HoverListeners;

    constructor(level: number) {
        this.view = new AppView(0);
        this.submit = new Submit();
        this.hover = new HoverListeners();
        this.level = level;
    }
    private redrawContent(): void {
        this.view.drawBoard(this.level);
        this.view.drawMenu(this.level);
        this.view.createHtmlContent(this.level);
        this.addListenersToButtons();
        this.hover.addHoverListeners();
    }
    public addHoverListeners() {
        this.hover.addHoverListeners();
    }
    public nextLevel(level: number): void {
        this.level = level;
        if (this.level < levels.length - 1) {
            this.level += 1;
            this.redrawContent();
        }
    }
    public prevLevel(level: number): void {
        this.level = level;
        if (this.level > 0) {
            this.level -= 1;
            this.redrawContent();
        }
    }
    public addListenersToButtons(): void {
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
        const levelButtons = getElement('.levels__content');
        levelButtons.addEventListener('click', (e: Event) => {
            if (e.target && e.target instanceof HTMLElement) {
                if (e.target.className === 'levels__button') {
                    this.level = Number(e.target.id.slice(3)) - 1;
                    this.redrawContent();
                }
            }
        });
    }
}
export default ButtonListeners;
