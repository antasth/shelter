import Cup from './cup';
import Star from './star';

class Table {
    cup: Cup;
    star: Star;
    constructor() {
        this.cup = new Cup();
        this.star = new Star();
    }
    drawTable() {
        console.log('table');
        document.querySelector('.board')?.append(this.cup.drawCup());
        document.querySelector('.cup')?.append(this.star.drawStar());
    }
}

export default Table;
