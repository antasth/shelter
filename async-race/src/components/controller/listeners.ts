import { getElement } from '../../functions/functions';
import GarageController from './garageController';

class Listeners {
  private garageController: GarageController;

  constructor() {
    this.garageController = new GarageController();
  }

  public addListeners(): void {
    this.addCarBlockListeners();
    this.addGenerateButtonListener();
    this.addRaceButtonListener();
    this.addResetButtonListener();
    this.addNavButtonPrevListener();
    this.addNavButtonNextListener();
    this.addCreateCarButtonListener();
    this.addUpdateCarButtonListener();
  }

  private addCarBlockListeners() {
    const carBlocks = document.querySelectorAll('.garage__item');
    if (carBlocks.length) {
      carBlocks.forEach((carBlock) => {
        carBlock.addEventListener('click', async (event: Event) => {
          if (event.target && event.target instanceof HTMLButtonElement) {
            if (carBlock instanceof HTMLElement) {
              const carId = Number(carBlock.dataset.index);
              if (event.target.classList.contains('button__remove')) {
                await this.garageController.deleteCarFromGarage(carId, carBlock);
                this.addListeners();
              }
              if (event.target.classList.contains('button__start')) {
                this.garageController.startCar(carId);
              }
              if (event.target.classList.contains('button__stop')) {
                this.garageController.stopCar(carId);
              }
              if (event.target.classList.contains('button__select')) {
                this.garageController.selectCar(carId);
              }
            }
          }
        });
      });
    }
  }

  private addCreateCarButtonListener(): void {
    const createButton = getElement('.button__create');
    createButton.addEventListener('click', async () => {
      await this.garageController.createCar();
      this.addListeners();
    });
  }

  private addUpdateCarButtonListener(): void {
    const updateButton = getElement('.button__update');
    updateButton.addEventListener('click', async () => {
      await this.garageController.updateSelectedCar();
      this.addListeners();
    });
  }

  private addGenerateButtonListener(): void {
    const generateButton = getElement('.button__generate');
    generateButton.addEventListener('click', async () => {
      await this.garageController.generateCars();
      this.addListeners();
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
