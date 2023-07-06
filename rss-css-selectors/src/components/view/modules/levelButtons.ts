import levels from '../../../data/levels';
import {
    createElement,
    getElement,
    isCompletedByHelp,
    isLevelCompleted,
    setActiveLevel,
} from '../../../functions/functions';

class LevelButtons {
    public drawLevelButtons(level: number): void {
        const sidebar = getElement('.sidebar__wrapper');
        const levels = createElement('div', 'levels', '', sidebar);
        const levelsHeader = createElement('div', 'levels__top', '', levels);
        createElement('h3', 'levels__header', 'Select level', levelsHeader);
        const content = createElement('div', 'levels__content', '', levels);
        this.drawLevel(content);
        setActiveLevel(level);
    }
    private drawLevel(parentElement: HTMLElement) {
        levels.forEach((_, i) => {
            const lvl = String(i + 1);
            const button = createElement('button', 'levels__button', lvl, parentElement);
            button.id = `lvl${lvl}`;
            if (isLevelCompleted(i) !== null) {
                button.classList.add(isCompletedByHelp(isLevelCompleted(i)));
            }
        });
    }
}

export default LevelButtons;
