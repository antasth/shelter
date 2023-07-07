import gameData from '../../../data/gamedata';
import levels from '../../../data/levels';
import {
    checkAnySelectors,
    clearInput,
    getElement,
    resetGameProgress,
    saveToLocalStorage,
    showAnswer,
} from '../../../functions/functions';
import AppView from '../../view/appview';
import HoverListeners from './hoverListeners';
import InputListener from './inputListeners';

class Listeners {
    private view: AppView;
    private hover: HoverListeners;
    private input: InputListener;
    private level: number;
    private isHelpUsed = false;
    private editor: HTMLElement;
    private board: HTMLElement;
    private sidebar: HTMLElement;

    constructor(level: number) {
        this.level = level;
        this.view = new AppView(0);
        this.hover = new HoverListeners();
        this.input = new InputListener();
        this.editor = getElement('.editor');
        this.board = getElement('.board');
        this.sidebar = getElement('.sidebar');
    }

    private redrawContent(): void {
        this.view.drawBoard(this.level);
        this.view.drawMenu(this.level);
        this.view.createHtmlContent(this.level);
        this.hover.addHoverListeners();
        this.input.restoreInput();
        this.addButtonLeftListener();
        this.addButtonRightListener();
        this.addButtonResetListener();
        this.addButtonHelpListener();
        this.addButtonLevelsListener();
    }

    private nextLevel(level: number): void {
        this.level = level;
        if (this.level < levels.length - 1) {
            this.level += 1;
            this.redrawContent();
            gameData.currentLevel = this.level;
        }
    }
    private prevLevel(level: number): void {
        this.level = level;
        if (this.level > 0) {
            this.level -= 1;
            this.redrawContent();
            gameData.currentLevel = this.level;
        }
    }
    public addButtonLeftListener(): void {
        const buttonLeft = getElement('.menu__button-left');
        buttonLeft.addEventListener('click', () => {
            this.prevLevel(this.level);
            this.addButtonBurgerListener();
            saveToLocalStorage();
        });
    }
    public addButtonRightListener(): void {
        const buttonRight = getElement('.menu__button-right');
        buttonRight.addEventListener('click', () => {
            this.nextLevel(this.level);
            this.addButtonBurgerListener();
            saveToLocalStorage();
        });
    }
    public addButtonResetListener(): void {
        const resetButton = getElement('.reset__button');
        resetButton.addEventListener('click', () => {
            resetGameProgress();
            this.level = 0;
            this.redrawContent();
        });
    }
    public addButtonBurgerListener(): void {
        const burgerIcon = getElement('.burger__icon');
        burgerIcon.addEventListener('click', () => {
            burgerIcon.classList.toggle('burger__icon-active');
            this.sidebar.classList.toggle('sidebar__active');
        });
    }
    public addButtonHelpListener(): void {
        const helpButton = getElement('.help__button');
        helpButton.addEventListener('click', () => {
            this.editor.classList.remove('wobble');
            clearInput();
            this.isHelpUsed = true;
            this.input.clearInput();
            this.input.showAnswer(levels[this.level].answer[0]);
            showAnswer(levels[this.level].answer[0]);
        });
    }
    public addButtonLevelsListener(): void {
        const levelButtons = getElement('.levels__content');
        levelButtons.addEventListener('click', (e: Event) => {
            if (e.target && e.target instanceof HTMLElement) {
                if (e.target.className.includes('levels__button')) {
                    this.level = Number(e.target.id.replace(/[^\d]/g, '')) - 1;
                    gameData.currentLevel = this.level;
                    saveToLocalStorage();
                    this.redrawContent();
                }
            }
        });
    }
    public addButtonSubmitListener(): void {
        const submitButton = getElement('.editor__button');
        submitButton.addEventListener('click', () => {
            if (checkAnySelectors(this.level)) {
                this.editor.classList.remove('wobble');
                this.board.classList.add('swirl-out-bck');
                gameData.completedLevels.push({ level: this.level, help: this.isHelpUsed });
                gameData.currentLevel = this.level < levels.length - 1 ? this.level + 1 : this.level;
                saveToLocalStorage();
                clearInput();
                this.isHelpUsed = false;
                if (this.level === levels.length - 1) {
                    this.view.showWinMessage();
                }
                this.nextLevel(this.level);
            } else {
                this.editor.classList.add('wobble');
            }
        });
    }
    public addKeyboardEnterListener(): void {
        const input: HTMLInputElement = getElement('.editor__input');
        input.addEventListener('keyup', (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                if (checkAnySelectors(this.level)) {
                    this.editor.classList.remove('wobble');
                    this.board.classList.add('swirl-out-bck');
                    gameData.completedLevels.push({ level: this.level, help: this.isHelpUsed });
                    gameData.currentLevel = this.level < levels.length - 1 ? this.level + 1 : this.level;
                    saveToLocalStorage();
                    clearInput();
                    this.isHelpUsed = false;
                    if (this.level === levels.length - 1) {
                        this.view.showWinMessage();
                    }
                    this.nextLevel(this.level);
                } else {
                    this.editor.classList.add('wobble');
                }
            }
        });
    }
}
export default Listeners;
