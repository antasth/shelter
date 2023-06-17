import cupimg from '../../../assets/img/cup1.png';

class Cup {
    drawCup() {
        const cupcontent = document.createElement('div');
        cupcontent.classList.add('cup');
        const cup = document.createElement('img');
        cup.classList.add('cup__img');
        cup.src = cupimg;
        cupcontent.append(cup);
        return cupcontent;
    }
}
export default Cup;
