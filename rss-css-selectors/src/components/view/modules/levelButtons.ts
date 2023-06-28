import levels from '../../../data/levels';
import { createElement, getElement } from '../../../functions/functions';

class LevelButtons {
    public drawLevelButtons(): void {
        const sidebar = getElement('.sidebar__wrapper');
        const levels = createElement('div', 'levels', '', sidebar);
        createElement('h3', 'levels__header', 'Select level', levels);
        const content = createElement('div', 'levels__content', '', levels);
        this.drawLevel(content);
    }
    private drawLevel(parentElement: HTMLElement) {
        levels.forEach((_, i) => {
            const lvl = String(i + 1);
            createElement('button', 'levels__button', lvl, parentElement);
        });
    }
}

export default LevelButtons;
