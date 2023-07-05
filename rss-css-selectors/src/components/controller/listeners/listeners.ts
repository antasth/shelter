import gameData from '../../../data/gamedata';
import levels from '../../../data/levels';
import { checkAnswer, clearInput, getElement } from '../../../functions/functions';
import AppView from '../../view/appview';
import LocalStorage from '../localStorage/localStorage';
import BurgerListener from './burger';
import HelpListener from './help';
import HoverListeners from './hoverListeners';
import InputListener from './input';
import ResetListener from './reset';

class Listeners {
    private view: AppView;
    private hover: HoverListeners;
    private help: HelpListener;
    private reset: ResetListener;
    private input: InputListener;
    private burger: BurgerListener;
    private level: number;
    private isHelpUsed = false;
    private storage: LocalStorage;

    constructor(level: number) {
        this.level = level;
        this.view = new AppView(0);
        this.hover = new HoverListeners();
        this.help = new HelpListener();
        this.reset = new ResetListener();
        this.input = new InputListener();
        this.storage = new LocalStorage();
        this.burger = new BurgerListener();
    }

    private redrawContent(): void {
        this.view.drawBoard(this.level);
        this.view.drawMenu(this.level);
        this.view.drawHelpButton();
        this.view.drawResetButton();
        this.view.createHtmlContent(this.level);
        this.addListenersToButtons();
        this.hover.addHoverListeners();
        this.input.restoreInput();
    }
    public addHoverListeners() {
        this.hover.addHoverListeners();
    }
    public addBurgerListener() {
        this.burger.addBurgerListener();
    }
    public nextLevel(level: number): void {
        this.level = level;
        if (this.level < levels.length - 1) {
            this.level += 1;
            this.redrawContent();
            gameData.currentLevel = this.level;
        }
    }
    public prevLevel(level: number): void {
        this.level = level;
        if (this.level > 0) {
            this.level -= 1;
            this.redrawContent();
            gameData.currentLevel = this.level;
        }
    }
    public addListenersToButtons(): void {
        const buttonLeft = getElement('.menu__button-left');
        const buttonRight = getElement('.menu__button-right');
        buttonLeft.addEventListener('click', () => {
            this.prevLevel(this.level);
            gameData.currentLevel = this.level;
            this.storage.saveToLocalStorage();
        });
        buttonRight.addEventListener('click', () => {
            this.nextLevel(this.level);
            gameData.currentLevel = this.level;
            this.storage.saveToLocalStorage();
        });
        const submitButton = getElement('.editor__button');
        const editor = getElement('.editor');
        const board = getElement('.board');
        submitButton.addEventListener('click', () => {
            if (checkAnswer(this.level)) {
                editor.classList.remove('wobble');
                board.classList.add('swirl-out-bck');
                gameData.completedLevels.push({ level: this.level, help: this.isHelpUsed });
                gameData.currentLevel = this.level < levels.length - 1 ? this.level + 1 : this.level;
                this.storage.saveToLocalStorage();
                clearInput();
                this.isHelpUsed = false;
                if (this.level === levels.length - 1) {
                    this.view.showWinMessage();
                }
                this.nextLevel(this.level);
            } else if (checkAnswer(this.level) !== null) {
                editor.classList.add('wobble');
            }
        });
        const helpButton = getElement('.help__button');
        helpButton.addEventListener('click', () => {
            editor.classList.remove('wobble');
            clearInput();
            this.isHelpUsed = true;
            this.input.clearInput();
            this.input.showAnswer(levels[this.level].answer[0]);
            this.help.showAnswer(levels[this.level].answer[0]);
        });
        const input: HTMLInputElement = getElement('.editor__input');
        input.addEventListener('keyup', (event: KeyboardEvent) => {
            editor.classList.remove('wobble');
            this.input.clearInput();
            this.input.writeToFakeInput(input.value);
            if (event.key === 'Enter') {
                if (checkAnswer(this.level)) {
                    editor.classList.remove('wobble');
                    board.classList.add('swirl-out-bck');
                    gameData.completedLevels.push({ level: this.level, help: this.isHelpUsed });
                    gameData.currentLevel = this.level < levels.length - 1 ? this.level + 1 : this.level;
                    this.storage.saveToLocalStorage();
                    this.nextLevel(this.level);
                    clearInput();
                    this.isHelpUsed = false;
                } else if (checkAnswer(this.level) !== null) {
                    editor.classList.add('wobble');
                }
            }
        });
        const levelButtons = getElement('.levels__content');
        levelButtons.addEventListener('click', (e: Event) => {
            if (e.target && e.target instanceof HTMLElement) {
                if (e.target.className.includes('levels__button')) {
                    this.level = Number(e.target.id.slice(3)) - 1;
                    gameData.currentLevel = this.level;
                    this.storage.saveToLocalStorage();
                    this.redrawContent();
                }
            }
        });
        const resetButton = getElement('.reset__button');
        resetButton.addEventListener('click', () => {
            this.reset.resetGameProgress();
            this.level = 0;
            this.redrawContent();
        });
    }
}
export default Listeners;