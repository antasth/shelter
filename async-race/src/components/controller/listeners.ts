import { getElement } from '../../functions/functions';
import GarageController from './garageController';

class Listeners {
  private garageController: GarageController;

  constructor() {
    this.garageController = new GarageController();
  }

  public addListeners(): void {
    this.addGarageListeners();
    this.addGenerateButtonListener();
    this.addRaceButtonListener();
    this.addResetButtonListener();
    this.addNavButtonPrevListener();
  }

  private addGarageListeners(): void {
    const garage = getElement('.garage');
    garage.addEventListener('click', (event: Event) => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        const targetCarItem = event.target.closest('.garage__item');
        if (targetCarItem instanceof HTMLElement) {
          const carId = Number(targetCarItem.dataset.index);

          if (event.target.classList.contains('button__remove')) {
            this.garageController.deleteCarFromGarage(carId, targetCarItem).then(() => {
              this.addListeners();
            });
          }
          if (event.target.classList.contains('button__start')) {
            this.garageController.startCar(carId);
          }
          if (event.target.classList.contains('button__stop')) {
            this.garageController.stopCar(carId);
          }
        }
      }
    });
  }

  private addGenerateButtonListener() {
    const generateButton = getElement('.button__generate');
    generateButton.addEventListener('click', () => {
      this.garageController.generateCars();
    });
  }

  private addRaceButtonListener() {
    const raceButton = getElement('.button__race');
    raceButton.addEventListener('click', () => {
      this.garageController.startRace();
    });
  }

  private addResetButtonListener() {
    const resetButton = getElement('.button__reset');
    resetButton.addEventListener('click', () => {
      this.garageController.resetRace();
    });
  }

  private addNavButtonPrevListener() {
    const prevButton = getElement('.garage__nav__button-prev');
    prevButton.addEventListener('click', () => {
      this.garageController.showPrevPage().then(() => {
        this.addListeners();
      });
    });
  }
}
export default Listeners;
