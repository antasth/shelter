import * as garageRequest from '../../api/garage';
import { createRandomCar, getElement, reloadCars } from '../../functions/functions';
import Garage from '../view/garage';
import { startCar, stopCar } from './carDriving';

class Listeners {
  private garage: Garage;

  constructor() {
    this.garage = new Garage();
  }

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
            reloadCars(carId, () => {
              targetCarItem.remove();
              this.garage.drawGarage();
              this.addListeners();
            });
          }
          if (event.target.classList.contains('button__start')) {
            startCar(carId);
          }
          if (event.target.classList.contains('button__stop')) {
            stopCar(carId);
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
