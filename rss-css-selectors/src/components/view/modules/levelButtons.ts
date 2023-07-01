import gameData from '../../../data/gamedata';
import levels from '../../../data/levels';
import { createElement, getElement } from '../../../functions/functions';

class LevelButtons {
    public drawLevelButtons(level: number): void {
        const sidebar: HTMLDivElement = getElement('.sidebar__wrapper');
        const levels = createElement('div', 'levels', '', sidebar);
        const levelsHeader = createElement('div', 'levels__top', '', levels);
        createElement('h3', 'levels__header', 'Select level', levelsHeader);
        const content = createElement('div', 'levels__content', '', levels);
        this.drawLevel(content);
        this.setActiveLevel(level);
        console.log(gameData);
    }
    private drawLevel(parentElement: HTMLElement) {
        levels.forEach((_, i) => {
            const lvl = String(i + 1);
            const button = createElement('button', 'levels__button', lvl, parentElement);
            button.id = `lvl${lvl}`;
            const isCompletedByHelp: boolean | null = this.isLevelCompleted(i);
            if (isCompletedByHelp !== null) {
                button.classList.add(isCompletedByHelp ? 'levels__button__help' : 'levels__button__self');
            }
        });
    }
    public setActiveLevel(level: number): void {
        const button = document.getElementById(`lvl${level + 1}`);
        button?.classList.add('levels__button__active');
    }
    private isLevelCompleted(lvl: number): boolean | null {
        const [level] = gameData.completedLevels.filter((item) => item.level === lvl);
        return level ? level.help : null;
    }
}

export default LevelButtons;
