import * as engineRequest from '../../api/engine';
import * as garageRequest from '../../api/garage';
import { animateCar, createRandomCar, getElement } from '../../functions/functions';

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
          garageRequest.deleteCar(+targetCarItem.id);
          targetCarItem.remove();
        }
        if (targetCarItem && event.target.classList.contains('button__start')) {
          engineRequest.startEngine(+targetCarItem.id);
          // const car = getElement('.garage__item__car');
          // car.classList.add('move');
          animateCar(1000);
        }
        if (targetCarItem && event.target.classList.contains('button__stop')) {
          engineRequest.stopEngine(+targetCarItem.id);
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
