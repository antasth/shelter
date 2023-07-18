import * as engineRequest from '../../api/engine';
import * as garageRequest from '../../api/garage';
import { createRandomCar, getElement } from '../../functions/functions';
import { startCar } from './startCar';

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
        if (targetCarItem) {
          const carId = Number(targetCarItem.id);

          if (event.target.classList.contains('button__remove')) {
            garageRequest.deleteCar(carId);
            targetCarItem.remove();
          }
          if (event.target.classList.contains('button__start')) {
            startCar(carId);
          }
          if (event.target.classList.contains('button__stop')) {
            engineRequest.stopEngine(carId);
          }
        }
      }
    });
  }

  private addGenerateButtonListener() {
    const generateButton = getElement('.button__generate');
    generateButton.addEventListener('click', () => {
      for (let i = 0; i < 100; i += 1) garageRequest.postCar(createRandomCar());
    });
  }
}
export default Listeners;
