import * as request from '../../api/request';
import { getElement } from '../../functions/functions';

class Listeners {
  public addListeners(): void {
    this.addGarageListeners();
  }

  private addGarageListeners(): void {
    const garage = getElement('.garage');
    garage.addEventListener('click', (event: Event) => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        const targetCarItem = event.target.closest('.garage__item');
        console.log(targetCarItem);
        if (targetCarItem && event.target.classList.contains('button__remove')) {
          request.deleteCar(+targetCarItem.id);
          targetCarItem.remove();
        }
      }
    });
  }
}
export default Listeners;
