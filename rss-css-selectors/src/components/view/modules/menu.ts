import levels from '../../../data/levels';
import { createElement, getElement } from '../../../functions/functions';
import { LevelObject } from '../../../interfaces/interfaces';
import LevelButtons from './levelButtons';

class Menu {
    private data: LevelObject;
    private levelButtons: LevelButtons;

    constructor(level: number) {
        this.data = levels[level];
        this.levelButtons = new LevelButtons();
    }

    public drawMenu(level: number): void {
        this.data = levels[level];
        const sidebar: HTMLDivElement = getElement('.sidebar__wrapper');
        sidebar.replaceChildren();
        const menu = createElement('div', 'menu', '', sidebar);
        const nav = this.drawNavMenu();
        const content = this.drawContent();
        this.levelButtons.drawLevelButtons(level);
        menu.append(nav, content);
    }

    private drawNavMenu(): HTMLDivElement {
        const menuNav = document.createElement('div');
        menuNav.classList.add('menu__nav');
        const leftButton = this.drawNavButton('left');
        const rightButton = this.drawNavButton('right');
        const level = document.createElement('h1');
        level.innerText = `LEVEL ${this.data.id} OF ${levels.length}`;
        menuNav.append(leftButton, level, rightButton);
        return menuNav;
    }

    private drawNavButton(direction: string): HTMLButtonElement {
        const navButton = document.createElement('button');
        navButton.classList.add('menu__button', `menu__button-${direction}`);
        navButton.innerText = direction === 'left' ? '<' : '>';
        return navButton;
    }

    private drawContent(): HTMLElement {
        const content = createElement('div', 'menu__content', '', null);
        createElement('h1', 'menu__header', this.data.name, content);
        createElement('h3', 'menu__type', this.data.type, content);
        createElement('p', 'menu__description', this.data.description, content);
        createElement('p', 'menu__example', this.data.example, content);
        createElement('p', 'menu__task', this.data.task, content);
        return content;
    }
}

export default Menu;
