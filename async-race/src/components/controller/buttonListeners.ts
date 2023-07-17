import * as request from '../../api/request';
import { createRandomCar, getElement } from '../../functions/functions';

class Listeners {
  public addListeners(): void {
    this.addGarageListeners();
    this.addGenerateButtonListener();
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

  private addGenerateButtonListener() {
    const generateButton = getElement('.button__generate');
    generateButton.addEventListener('click', () => {
      for (let i = 0; i < 100; i += 1) request.postCar(createRandomCar());
    });
  }
}
export default Listeners;
