import { getElement } from '../../functions/functions';
import GarageController from './garageController';
import ModalController from './modalController';

class Listeners {
  private garageController: GarageController;

  private modalController: ModalController;

  constructor() {
    this.garageController = new GarageController();
    this.modalController = new ModalController();
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
    this.addModalCloseListeners();
  }

  private addGarageListeners(): void {
    this.addCarBlockListeners();
    this.addNavButtonPrevListener();
    this.addNavButtonNextListener();
    this.addModalCloseListeners();
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
                this.addGarageListeners();
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
      this.addGarageListeners();
    });
  }

  private addUpdateCarButtonListener(): void {
    const updateButton = getElement('.button__update');
    updateButton.addEventListener('click', async () => {
      await this.garageController.updateSelectedCar();
      this.addGarageListeners();
    });
  }

  private addGenerateButtonListener(): void {
    const generateButton = getElement('.button__generate');
    generateButton.addEventListener('click', async () => {
      await this.garageController.generateCars();
      this.addGarageListeners();
    });
  }

  private addRaceButtonListener(): void {
    const raceButton = getElement('.button__race');
    raceButton.addEventListener('click', async () => {
      const winner = await this.garageController.startRace();
      this.modalController.showModal();
      this.modalController.addModalContent(winner);
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
      this.addGarageListeners();
    });
  }

  private addNavButtonNextListener(): void {
    const prevButton = getElement('.garage__nav__button-next');
    prevButton.addEventListener('click', async () => {
      await this.garageController.showNextPage();
      this.addGarageListeners();
    });
  }

  private addModalCloseListeners(): void {
    const modal = getElement('.modal__overlay');
    const close = getElement('.modal__close');
    close.addEventListener('click', () => {
      this.modalController.hideModal();
    });
    modal.addEventListener('click', (e: Event) => {
      if (e.target === modal) {
        this.modalController.hideModal();
      }
    });
  }
}
export default Listeners;
