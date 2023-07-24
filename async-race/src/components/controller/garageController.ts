import * as engineRequest from '../../api/engine';
import * as garageRequest from '../../api/garage';
import appData from '../../data/appData';
import { BASE_CAR_SPEED, CARS_ON_PAGE } from '../../data/constants';
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
  }

  public async startCar(id: number): Promise<void> {
    const { velocity } = await engineRequest.startEngine(id);
    startCarAnimation(id, velocity * BASE_CAR_SPEED);
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
      console.log(winner);
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

  public async showPrevPage(): Promise<void> {
    if (appData.garagePage > 1) appData.garagePage -= 1;
    await garageRequest.getCars(appData.garagePage, CARS_ON_PAGE);
    this.garageView.redrawGarage();
  }

  public async showNextPage(): Promise<void> {
    if (appData.garagePage < appData.garagePagesCount) appData.garagePage += 1;
    await garageRequest.getCars(appData.garagePage, CARS_ON_PAGE);
    this.garageView.redrawGarage();
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
      inputCarName.value = '';
      inputColor.value = '#ffffff';
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
      inputCarName.value = '';
      inputColor.value = '#ffffff';
    }

    this.garageView.redrawGarage();
  }

  public blockAllButtons(): void {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach((button) => {
      // eslint-disable-next-line no-param-reassign
      if (button instanceof HTMLButtonElement) button.disabled = true;
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
