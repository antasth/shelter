import Cup from './cup';
// import Star from './star';
import levels from '../../../data/levels';

class Table {
    cup: Cup;
    // star: Star;
    constructor() {
        this.cup = new Cup();
        // this.star = new Star();
    }
    drawTable(lvl: number) {
        const data = levels[lvl];
        console.log(data.html);
        data.html.forEach((elem) => {
            if (elem === 'cup') document.querySelector('.board')?.append(this.cup.drawCup());
        });
    }
}

export default Table;
