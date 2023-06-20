import levels from '../../../data/levels';
import { getElement } from '../../../functions/functions';
import { LevelElement, LevelObject } from '../../../interfaces/interfaces';

class Board {
    private data: LevelObject;

    constructor(level: number) {
        this.data = levels[level];
    }

    private drawElement(elem: LevelElement): HTMLElement {
        console.log(elem);
        const cup = document.createElement(elem.tag);
        if (elem.class) cup.classList.add(elem.class);
        if (elem.id) cup.setAttribute('id', elem.id);
        if (elem.child) {
            const cupChild = document.createElement(elem.child);
            if (elem.childClass) cupChild.classList.add(elem.childClass);
            if (elem.childId) cupChild.setAttribute('id', elem.childId);
            cup.append(cupChild);
        }
        return cup;
    }

    public drawBoard(lvl: number): void {
        this.data = levels[lvl];
        const board = getElement('.board');
        board.replaceChildren();
        this.data.html.forEach((elem) => {
            board.append(this.drawElement(elem));
        });
    }
}

export default Board;
