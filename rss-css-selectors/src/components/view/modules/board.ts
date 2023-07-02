import levels from '../../../data/levels';
import { getElement } from '../../../functions/functions';
import { LevelElement, LevelObject } from '../../../interfaces/interfaces';

class Board {
    private data: LevelObject;

    constructor(level: number) {
        this.data = levels[level];
    }

    private drawElement(elem: LevelElement): HTMLElement {
        const cup = document.createElement(elem.tag);
        if (elem.class) cup.classList.add(elem.class);
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

    public drawBoard(lvl: number): void {
        this.data = levels[lvl];
        const board: HTMLDivElement = getElement('.board');
        setTimeout(() => {
            board.classList.remove('swirl-out-bck');
        }, 1000);

        board.replaceChildren();
        this.data.html.forEach((elem) => {
            board.append(this.drawElement(elem));
        });
    }
}

export default Board;
