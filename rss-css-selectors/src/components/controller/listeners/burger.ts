import { getElement } from '../../../functions/functions';

class BurgerListener {
    public addBurgerListener(): void {
        const burgerIcon = getElement('.burger__icon');
        const sidebar = getElement('.sidebar');
        burgerIcon.addEventListener('click', () => {
            burgerIcon.classList.toggle('burger__icon-active');
            sidebar.classList.toggle('sidebar__active');
        });
    }
}
export default BurgerListener;
