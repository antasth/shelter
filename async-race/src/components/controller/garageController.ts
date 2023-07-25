import * as engineRequest from '../../api/engine';
import * as garageRequest from '../../api/garage';
import appData from '../../data/appData';
import { CARS_ON_PAGE } from '../../data/constants';
import { startCarAnimation, stopCarAnimation } from '../../functions/carAnimations';
import { generateRandomCars, getCarsOnPageId, getElement } from '../../functions/functions';
import { Engine, EngineDriveResponse } from '../../interfaces/interfaces';
import Garage from '../view/garage';
import WinnersController from './winnersController';

class GarageController {
  private garageView: Garage;

  private winnersController: WinnersController;

  constructor() {
    this.garageView = new Garage();
    this.winnersController = new WinnersController();
  }

  public async deleteCarFromGarage(carId: number, targetCarItem: Element): Promise<void> {
    await garageRequest.deleteCar(carId);
    await garageRequest.getCars(appData.garagePage, CARS_ON_PAGE);
    await this.winnersController.deleteWinnerFromServer(carId);
    targetCarItem.remove();
    this.garageView.redrawGarage();
    this.clearInputs();
  }

  public async startCar(id: number): Promise<void> {
    const { distance, velocity } = await engineRequest.startEngine(id);
    startCarAnimation(id, distance / velocity);
    try {
      await engineRequest.switchToDriveMode(id);
    } catch (error) {
      stopCarAnimation(id, true);
    }
  }

  private async startEngines(carsOnPageId: number[]): Promise<Engine[]> {
    const requests = carsOnPageId.map((id) => {
      return engineRequest.startEngine(id);
    });
    const responses = await Promise.all(requests);
    return responses;
  }

  public async stopCar(id: number): Promise<void> {
    await engineRequest.stopEngine(id);
    stopCarAnimation(id);
  }

  public async generateCars(): Promise<void> {
    const cars = generateRandomCars();
    const requests = cars.map(async (car) => {
      await garageRequest.postCar(car);
    });
    await Promise.all(requests);
    await garageRequest.getCars(appData.garagePage, CARS_ON_PAGE);
    this.garageView.redrawGarage();
  }

  public async startRace(): Promise<EngineDriveResponse> {
    const carsOnPageId = getCarsOnPageId();
    const engineResponses = await this.startEngines(carsOnPageId);
    const requests = carsOnPageId.map(async (carId, i) => {
      const animationTime = engineResponses[i].distance / engineResponses[i].velocity;
      startCarAnimation(carId, animationTime);
      try {
        const res = await engineRequest.switchToDriveMode(carId);
        res.time = animationTime;
        return res;
      } catch {
        stopCarAnimation(carId, true);
        throw new Error();
      }
    });
    let winner = {
      success: false,
      id: 0,
      time: 0
    };
    try {
      winner = await Promise.any(requests);
      this.winnersController.sendWinnerToServer(winner);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
    return winner;
  }

  public resetRace(): void {
    const carsOnPageId = getCarsOnPageId();
    carsOnPageId.forEach((id) => {
      this.stopCar(id);
    });
    this.garageView.redrawGarage();
  }

  public clearInputs(): void {
    const inputCreateName: HTMLInputElement = getElement('.input__create.input__text');
    const inputCreateColor: HTMLInputElement = getElement('.input__create.input__color');
    const inputUpdateName: HTMLInputElement = getElement('.input__update.input__text');
    const inputUpdateColor: HTMLInputElement = getElement('.input__update.input__color');
    inputCreateName.value = '';
    inputCreateColor.value = '#ffffff';
    inputUpdateName.value = '';
    inputUpdateColor.value = '#ffffff';
  }

  public async showPrevPage(): Promise<void> {
    if (appData.garagePage > 1) appData.garagePage -= 1;
    await garageRequest.getCars(appData.garagePage, CARS_ON_PAGE);
    this.garageView.redrawGarage();
    this.clearInputs();
  }

  public async showNextPage(): Promise<void> {
    if (appData.garagePage < appData.garagePagesCount) appData.garagePage += 1;
    await garageRequest.getCars(appData.garagePage, CARS_ON_PAGE);
    this.garageView.redrawGarage();
    this.clearInputs();
  }

  public async createCar(): Promise<void> {
    const inputCarName: HTMLInputElement = getElement('.input__create.input__text');
    const inputColor: HTMLInputElement = getElement('.input__create.input__color');
    if (inputCarName.value) {
      const newCar = {
        name: inputCarName.value,
        color: inputColor.value
      };
      await garageRequest.postCar(newCar);
      await garageRequest.getCars(appData.garagePage, CARS_ON_PAGE);
      this.clearInputs();
    }
    this.garageView.redrawGarage();
  }

  public selectCar(carId: number): void {
    const inputCarName: HTMLInputElement = getElement('.input__update.input__text');
    const inputColor: HTMLInputElement = getElement('.input__update.input__color');
    const [{ name, color }] = appData.carsData.filter((car) => {
      return car.id === carId;
    });
    inputCarName.value = name;
    inputColor.value = color;
    appData.updateCarId = carId;
  }

  public async updateSelectedCar(): Promise<void> {
    if (appData.updateCarId) {
      const inputCarName: HTMLInputElement = getElement('.input__update.input__text');
      const inputColor: HTMLInputElement = getElement('.input__update.input__color');
      const carData = {
        name: inputCarName.value,
        color: inputColor.value
      };

      const updatedCar = await garageRequest.updateCar(appData.updateCarId, carData);
      const carIndex = appData.carsData.findIndex((car) => {
        return car.id === appData.updateCarId;
      });
      appData.carsData.splice(carIndex, 1, updatedCar);
      appData.updateCarId = 0;
      this.clearInputs();
    }

    this.garageView.redrawGarage();
  }

  public blockAllButtons(): void {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach((button) => {
      if (
        button instanceof HTMLButtonElement &&
        !button.classList.contains('button__garage') &&
        !button.classList.contains('button__winners')
      ) {
        // eslint-disable-next-line no-param-reassign
        button.disabled = true;
      }
    });
  }

  public unBlockAllButtons(): void {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach((button) => {
      if (button instanceof HTMLButtonElement) {
        if (!button.classList.contains('button__stop')) {
          // eslint-disable-next-line no-param-reassign
          button.disabled = false;
        }
      }
    });
  }

  public async getWinnersCarsList(): Promise<void> {
    await garageRequest.getWinnersCarsList();
    this.winnersController.redrawWinnersTable();
  }

  public blockSelectedButtons(selector: string, action: string): void {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach((button) => {
      if (button instanceof HTMLButtonElement) {
        if (action === 'block') {
          // eslint-disable-next-line no-param-reassign
          button.disabled = true;
        } else {
          // eslint-disable-next-line no-param-reassign
          button.disabled = false;
        }
      }
    });
  }

  public blockOneButton(buttonClass: string): void {
    const button = getElement(buttonClass);
    if (button instanceof HTMLButtonElement) button.disabled = true;
  }

  public unblockOneButton(buttonClass: string): void {
    const button = getElement(buttonClass);
    if (button instanceof HTMLButtonElement) button.disabled = false;
  }
}

export default GarageController;
