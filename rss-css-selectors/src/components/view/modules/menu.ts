import levels from '../../../data/levels';
import {
    createElement,
    getDirectionSymbol,
    getElement,
    getLevelHeader,
    isCompletedByHelp,
    isLevelCompleted,
    setActiveLevel,
} from '../../../functions/functions';
import { LevelObject } from '../../../interfaces/interfaces';

class Menu {
    private data: LevelObject;

    constructor(level: number) {
        this.data = levels[level];
    }

    public drawMenu(level: number): void {
        this.data = levels[level];
        const sidebar = getElement('.sidebar__wrapper');
        sidebar.replaceChildren();
        const menu = createElement('div', 'menu', '', sidebar);
        const nav = this.drawNavMenu();
        const content = this.drawContent();
        menu.append(nav, content);
        this.drawLevelsContainer(level);
        this.drawHelpButton();
        this.drawResetButton();
    }

    private drawNavMenu(): HTMLElement {
        const menuNav = createElement('div', 'menu__nav', '', null);
        const levelHeader = getLevelHeader(this.data.id, levels.length);
        const level = createElement('h1', 'menu__nav__header', levelHeader, null);
        const leftButton = this.drawNavButton('left');
        const rightButton = this.drawNavButton('right');
        menuNav.append(leftButton, level, rightButton);
        return menuNav;
    }

    private drawContent(): HTMLElement {
        const content = createElement('div', 'menu__content', '', null);
        createElement('h2', 'menu__header', this.data.name, content);
        createElement('h3', 'menu__type', this.data.type, content);
        createElement('p', 'menu__description', this.data.description, content);
        createElement('p', 'menu__example', this.data.example, content);
        createElement('p', 'menu__task', this.data.task, content);
        return content;
    }
    private drawLevelsContainer(level: number): void {
        const sidebar = getElement('.sidebar__wrapper');
        const levels = createElement('div', 'levels', '', sidebar);
        const levelsHeader = createElement('div', 'levels__top', '', levels);
        createElement('h3', 'levels__header', 'Select level', levelsHeader);
        const content = createElement('div', 'levels__content', '', levels);
        this.drawLevelButtons(content);
        setActiveLevel(level);
    }
    private drawLevelButtons(parentElement: HTMLElement): void {
        levels.forEach((_, i) => {
            const lvl = String(i + 1);
            const button = createElement('button', 'levels__button', lvl, parentElement);
            button.id = `lvl${lvl}`;
            if (isLevelCompleted(i) !== null) {
                button.classList.add(isCompletedByHelp(isLevelCompleted(i)));
            }
        });
    }
    private drawNavButton(direction: string): HTMLButtonElement {
        const navButton = document.createElement('button');
        navButton.classList.add('menu__button', `menu__button-${direction}`);
        navButton.innerText = getDirectionSymbol(direction);
        return navButton;
    }
    private drawHelpButton(): void {
        const board = getElement('.levels__top');
        createElement('button', 'help__button', 'need help?', board);
    }
    private drawResetButton(): void {
        const levels = getElement('.levels__top');
        createElement('button', 'reset__button', 'reset', levels);
    }
}

export default Menu;
