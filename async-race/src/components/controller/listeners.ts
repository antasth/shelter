import appData from '../../data/appData';
import { getElement } from '../../functions/functions';
import GarageController from './garageController';
import ModalController from './modalController';
import WinnersController from './winnersController';

class Listeners {
  private garageController: GarageController;

  private modalController: ModalController;

  private winnersController: WinnersController;

  constructor() {
    this.garageController = new GarageController();
    this.modalController = new ModalController();
    this.winnersController = new WinnersController();
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
    this.addGarageButtonListeners();
  }

  private addGarageListeners(): void {
    this.addCarBlockListeners();
    this.addNavButtonPrevListener();
    this.addNavButtonNextListener();
    this.addModalCloseListeners();
  }

  private addWinnersListeners() {
    this.addWinColumnSortListener();
    this.addTimeColumnSortListener();
    this.addPrevWinnersButtonListener();
    this.addNextWinnersButtonListener();
  }

  private addWinnersTableListeners() {
    this.addWinColumnSortListener();
    this.addTimeColumnSortListener();
    this.addNextWinnersButtonListener();
    this.addPrevWinnersButtonListener();
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
                this.garageController.unblockOneButton('.button__race');
              }
              if (event.target.classList.contains('button__start')) {
                this.garageController.startCar(carId);
                this.garageController.blockOneButton(`.button__start[data-index="${carId}"]`);
                this.garageController.blockOneButton('.button__race');
                this.garageController.unblockOneButton(`.button__stop[data-index="${carId}"]`);
              }
              if (event.target.classList.contains('button__stop')) {
                this.garageController.stopCar(carId);
                this.garageController.blockOneButton(`.button__stop[data-index="${carId}"]`);
                this.garageController.unblockOneButton('.button__race');
                this.garageController.unblockOneButton(`.button__start[data-index="${carId}"]`);
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
      this.garageController.unblockOneButton('.button__race');
      this.addGarageListeners();
    });
  }

  private addRaceButtonListener(): void {
    const raceButton = getElement('.button__race');
    raceButton.addEventListener('click', async () => {
      this.garageController.blockAllButtons();
      const winner = await this.garageController.startRace();
      this.modalController.showModal();
      this.modalController.addModalContent(winner);
      this.garageController.unBlockAllButtons();
    });
  }

  private addResetButtonListener(): void {
    const resetButton = getElement('.button__reset');
    resetButton.addEventListener('click', () => {
      this.garageController.resetRace();
      this.garageController.unBlockAllButtons();
      this.addGarageListeners();
    });
  }

  private addNavButtonPrevListener(): void {
    const prevButton = getElement('.garage__nav__button-prev');
    prevButton.addEventListener('click', async () => {
      await this.garageController.showPrevPage();
      this.garageController.unblockOneButton('.button__race');
      this.addGarageListeners();
    });
  }

  private addNavButtonNextListener(): void {
    const prevButton = getElement('.garage__nav__button-next');
    prevButton.addEventListener('click', async () => {
      await this.garageController.showNextPage();
      this.garageController.unblockOneButton('.button__race');
      this.addGarageListeners();
    });
  }

  private addPrevWinnersButtonListener(): void {
    const prevButton = getElement('.winners__button__prev');
    prevButton.addEventListener('click', async () => {
      await this.winnersController.showPrevPage();
      this.addWinnersTableListeners();
    });
  }

  private addNextWinnersButtonListener(): void {
    const nextButton = getElement('.winners__button__next');
    nextButton.addEventListener('click', async () => {
      await this.winnersController.showNextPage();
      this.addWinnersTableListeners();
    });
  }

  private addGarageButtonListeners(): void {
    const garageButton = getElement('.button__garage');
    const winnersButton = getElement('.button__winners');
    const winnersViewContent = getElement('.winners');

    garageButton.addEventListener('click', () => {
      winnersViewContent.style.display = 'none';
    });

    winnersButton.addEventListener('click', async () => {
      winnersViewContent.style.display = 'block';
      winnersViewContent.style.zIndex = '5';
      await this.winnersController.getWinnersFromServer();
      await this.garageController.getWinnersCarsList();
      this.addWinnersListeners();
    });
  }

  private addWinColumnSortListener(): void {
    const winColumnHeader = getElement('.table__wins');
    winColumnHeader.addEventListener('click', async () => {
      await this.winnersController.sortWinnersByWins(appData.winnersPage);
      this.addWinnersTableListeners();
    });
  }

  private addTimeColumnSortListener(): void {
    const timeColumnHeader = getElement('.table__time');
    timeColumnHeader.addEventListener('click', async () => {
      await this.winnersController.sortWinnersByTime(appData.winnersPage);
      this.addWinnersTableListeners();
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
