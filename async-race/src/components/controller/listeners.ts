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
    this.addNavButtonNextListener();
    this.addCreateCarButtonListener();
    // this.addRemoveButtonListeners();
  }

  private addGarageListeners(): void {
    const garage = getElement('.garage');
    garage.addEventListener('click', async (event: Event) => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        const targetCarItem = event.target.closest('.garage__item');
        if (targetCarItem instanceof HTMLElement) {
          const carId = Number(targetCarItem.dataset.index);

          if (event.target.classList.contains('button__remove')) {
            await this.garageController.deleteCarFromGarage(carId, targetCarItem);
            this.addListeners();
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

  // private addRemoveButtonListeners() {
  //   const removeButtons = getElements('.button__remove');
  //   removeButtons.forEach((button) => {
  //     button.addEventListener('click', async () => {
  //       if (button instanceof HTMLButtonElement) {
  //         const targetCarItem = button.closest('.garage__item');
  //         if (targetCarItem instanceof HTMLElement) {
  //           await this.garageController
  // .deleteCarFromGarage(Number(button.dataset.index), targetCarItem);
  //           this.addListeners();
  //         }
  //       }
  //     });
  //   });
  // }

  private addCreateCarButtonListener(): void {
    const createButton = getElement('.button__create');
    createButton.addEventListener('click', async () => {
      await this.garageController.createCar();
      this.addListeners();
    });
  }

  private addGenerateButtonListener(): void {
    const generateButton = getElement('.button__generate');
    generateButton.addEventListener('click', () => {
      this.garageController.generateCars();
    });
  }

  private addRaceButtonListener(): void {
    const raceButton = getElement('.button__race');
    raceButton.addEventListener('click', () => {
      this.garageController.startRace();
    });
  }

  private addResetButtonListener(): void {
    const resetButton = getElement('.button__reset');
    resetButton.addEventListener('click', () => {
      this.garageController.resetRace();
    });
  }

  private addNavButtonPrevListener(): void {
    const prevButton = getElement('.garage__nav__button-prev');
    prevButton.addEventListener('click', async () => {
      await this.garageController.showPrevPage();
      this.addListeners();
    });
  }

  private addNavButtonNextListener(): void {
    const prevButton = getElement('.garage__nav__button-next');
    prevButton.addEventListener('click', async () => {
      await this.garageController.showNextPage();
      this.addListeners();
    });
  }
}
export default Listeners;
