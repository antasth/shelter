import gameData from '../../../data/gamedata';
import levels from '../../../data/levels';
import {
    createElement,
    filterCompletedLevels,
    getElement,
    getFromLocalStorage,
    isCompletedByHelp,
} from '../../../functions/functions';
import { GameData } from '../../../interfaces/interfaces';

class LevelButtons {
    public drawLevelButtons(level: number): void {
        const sidebar: HTMLDivElement = getElement('.sidebar__wrapper');
        const levels = createElement('div', 'levels', '', sidebar);
        const levelsHeader = createElement('div', 'levels__top', '', levels);
        createElement('h3', 'levels__header', 'Select level', levelsHeader);
        const content = createElement('div', 'levels__content', '', levels);
        this.drawLevel(content);
        this.setActiveLevel(level);
    }
    private drawLevel(parentElement: HTMLElement) {
        levels.forEach((_, i) => {
            const lvl = String(i + 1);
            const button = createElement('button', 'levels__button', lvl, parentElement);
            button.id = `lvl${lvl}`;
            if (this.isLevelCompleted(i) !== null) {
                button.classList.add(isCompletedByHelp(this.isLevelCompleted(i)));
            }
        });
    }
    public setActiveLevel(level: number): void {
        const button = getElement(`#lvl${level + 1}`);
        button?.classList.add('levels__button__active');
    }
    private isLevelCompleted(lvl: number): boolean | null {
        const dataFromLocalStorage: GameData = getFromLocalStorage();
        gameData.completedLevels = dataFromLocalStorage.completedLevels;
        console.log(filterCompletedLevels(gameData.completedLevels, lvl));

        const [level] = filterCompletedLevels(gameData.completedLevels, lvl);
        return level ? level.help : null;
    }
}

export default LevelButtons;
