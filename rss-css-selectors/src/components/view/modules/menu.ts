import levels from '../../../data/levels';
import { getElement } from '../../../functions/functions';
import { LevelObject } from '../../../interfaces/interfaces';

class Menu {
    // private level: number;
    private data: LevelObject;

    constructor(level: number) {
        // this.level = level + 1;
        this.data = levels[level];
    }

    public drawMenu(level: number): void {
        this.data = levels[level];
        const sidebar = getElement('.sidebar');
        sidebar.replaceChildren();
        const menu = document.createElement('div');
        menu.classList.add('menu');
        const nav = this.drawNavMenu();
        const content = this.drawContent();
        menu?.append(nav, content);
        sidebar.append(menu);
    }

    private drawNavMenu(): HTMLDivElement {
        const menuNav = document.createElement('div');
        menuNav.classList.add('menu__nav');
        const leftButton = this.drawNavButton('left');
        const rightButton = this.drawNavButton('right');
        const level = document.createElement('h1');
        level.innerText = `Level ${this.data.id} of ${levels.length}`;
        menuNav.append(leftButton, level, rightButton);
        return menuNav;
    }

    private drawNavButton(direction: string): HTMLButtonElement {
        const navButton = document.createElement('button');
        navButton.classList.add('menu__button', `menu__button-${direction}`);
        navButton.innerText = direction === 'left' ? '<' : '>';
        return navButton;
    }

    private drawContent(): HTMLDivElement {
        const content = document.createElement('div');
        content.classList.add('menu__content');

        const header = document.createElement('h1');
        header.innerText = this.data.name;

        const type = document.createElement('h3');
        type.innerText = this.data.type;

        const description = document.createElement('p');
        description.innerText = this.data.description;

        const example = document.createElement('p');
        example.innerText = this.data.example;

        const task = document.createElement('p');
        task.innerText = this.data.task;

        content.append(header, type, description, example, task);
        return content;
    }
}

export default Menu;
