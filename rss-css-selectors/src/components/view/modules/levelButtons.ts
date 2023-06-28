import levels from '../../../data/levels';
import { createElement, getElement } from '../../../functions/functions';

class LevelButtons {
    public drawLevelButtons(level: number): void {
        const sidebar = getElement('.sidebar__wrapper');
        const levels = createElement('div', 'levels', '', sidebar);
        createElement('h3', 'levels__header', 'Select level', levels);
        const content = createElement('div', 'levels__content', '', levels);
        this.drawLevel(content);
        this.setActiveLevel(level);
    }
    private drawLevel(parentElement: HTMLElement) {
        levels.forEach((_, i) => {
            const lvl = String(i + 1);
            const button = createElement('button', 'levels__button', lvl, parentElement);
            button.id = `lvl${lvl}`;
        });
    }
    public setActiveLevel(level: number): void {
        const button = document.getElementById(`lvl${level + 1}`);
        button?.classList.add('levels__button__active');
    }
}

export default LevelButtons;
