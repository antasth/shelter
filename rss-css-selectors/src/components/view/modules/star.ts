import starimg from '../../../assets/img/star1.png';
class Star {
    drawStar() {
        const star = document.createElement('img');
        star.classList.add('star__img');
        star.src = starimg;
        return star;
    }
}
export default Star;
