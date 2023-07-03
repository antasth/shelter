import levels from '../../../data/levels';
import { createElement, getElement } from '../../../functions/functions';
import { LevelElement, LevelObject } from '../../../interfaces/interfaces';

class Board {
    private data: LevelObject;

    constructor(level: number) {
        this.data = levels[level];
    }

    private drawElement(elem: LevelElement): HTMLElement {
        const cup = document.createElement(elem.tag);
        if (elem.class) cup.classList.add(...elem.class);
        if (elem.id) cup.setAttribute('id', elem.id);
        cup.setAttribute('data-index', elem.index);
        cup.setAttribute('data-tooltip', elem.tooltip);
        if (elem.child) {
            const cupChild = document.createElement(elem.child);
            if (elem.childClass) cupChild.classList.add(elem.childClass);
            if (elem.childId) cupChild.setAttribute('id', elem.childId);
            if (elem.childIndex) cupChild.setAttribute('data-index', elem.childIndex);
            if (elem.childTooltip) cupChild.setAttribute('data-tooltip', elem.childTooltip);
            cup.append(cupChild);
        }
        return cup;
    }
    private addAnimationsToTargetElements(targets: number[]): void {
        targets.forEach((targetIndex: number) => {
            const targetElement: HTMLElement = getElement(`[data-index="${targetIndex}"]`);
            targetElement.classList.add('target');
        });
    }
    public drawBoard(lvl: number): void {
        this.data = levels[lvl];
        const targetList = this.data.target;
        const board: HTMLDivElement = getElement('.board');
        setTimeout(() => {
            board.classList.remove('swirl-out-bck');
        }, 1000);

        board.replaceChildren();
        this.data.html.forEach((elem) => {
            board.append(this.drawElement(elem));
        });
        this.addAnimationsToTargetElements(targetList);
    }
    public showWinMessage() {
        const board: HTMLDivElement = getElement('.board');
        const editor: HTMLDivElement = getElement('.editor__content');
        board.replaceChildren();
        editor.replaceChildren();
        board.classList.remove('swirl-out-bck');
        createElement('h1', 'win__message', 'Поздравляю, последний уровень пройден!', board);
    }
}

export default Board;
