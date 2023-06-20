import levels from '../../../data/levels';
import { LevelElement } from '../../../interfaces/interfaces';

class Board {
    drawElement(elem: LevelElement) {
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
        document.querySelector('.board')?.append(cup);
    }
    drawBoard(lvl: number) {
        const data = levels[lvl];
        // console.log(data.html);
        data.html.forEach((elem) => {
            this.drawElement(elem);
        });
    }
}

export default Board;
