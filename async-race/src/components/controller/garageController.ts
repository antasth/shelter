import * as engineRequest from '../../api/engine';
import * as garageRequest from '../../api/garage';
import { BASE_CAR_SPEED, CARS_ON_PAGE } from '../../data/constants';
import raceData from '../../data/raceData';
import { startCarAnimation, stopCarAnimation } from '../../functions/carAnimations';
import { generateRandomCars, getCarsOnPageId, getElement } from '../../functions/functions';
import { Engine, EngineDriveResponse } from '../../interfaces/interfaces';
import Garage from '../view/garage';

class GarageController {
  private garageView: Garage;

  constructor() {
    this.garageView = new Garage();
  }

  public async deleteCarFromGarage(carId: number, targetCarItem: Element): Promise<void> {
    await garageRequest.deleteCar(carId);
    await garageRequest.getCars(raceData.currentPage, CARS_ON_PAGE);
    targetCarItem.remove();
    this.garageView.drawGarage();
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
    await garageRequest.getCars(raceData.currentPage, CARS_ON_PAGE);
    this.garageView.drawGarage();
  }

  public async startRace(): Promise<EngineDriveResponse> {
    const carsOnPageId = getCarsOnPageId();
    const engineResponses = await this.startEngines(carsOnPageId);
    const requests = carsOnPageId.map(async (carId, i) => {
      const animationTime = engineResponses[i].distance / engineResponses[i].velocity;
      startCarAnimation(carId, animationTime);
      try {
        const res = await engineRequest.switchToDriveMode(carId);
        console.log(res);

        return res;
      } catch {
        stopCarAnimation(carId, true);
        throw new Error();
      }
    });
    const result = await Promise.any(requests);
    console.log('result', result);
    return result;
  }

  public resetRace(): void {
    const carsOnPageId = getCarsOnPageId();
    carsOnPageId.forEach((id) => {
      this.stopCar(id);
    });
  }

  public async showPrevPage(): Promise<void> {
    if (raceData.currentPage > 1) raceData.currentPage -= 1;
    await garageRequest.getCars(raceData.currentPage, CARS_ON_PAGE);
    this.garageView.drawGarage();
  }

  public async showNextPage(): Promise<void> {
    if (raceData.currentPage < raceData.garagePagesCount) raceData.currentPage += 1;
    await garageRequest.getCars(raceData.currentPage, CARS_ON_PAGE);
    this.garageView.drawGarage();
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
      await garageRequest.getCars(raceData.currentPage, CARS_ON_PAGE);
    }
    this.garageView.drawGarage();
  }

  public selectCar(carId: number): void {
    const inputCarName: HTMLInputElement = getElement('.input__update.input__text');
    const inputColor: HTMLInputElement = getElement('.input__update.input__color');
    const [{ name, color }] = raceData.carsData.filter((car) => {
      return car.id === carId;
    });
    inputCarName.value = name;
    inputColor.value = color;
    raceData.updateCarId = carId;
  }

  public async updateSelectedCar(): Promise<void> {
    if (raceData.updateCarId) {
      console.log(raceData.updateCarId);
      const inputCarName: HTMLInputElement = getElement('.input__update.input__text');
      const inputColor: HTMLInputElement = getElement('.input__update.input__color');
      const carData = {
        name: inputCarName.value,
        color: inputColor.value
      };

      const updatedCar = await garageRequest.updateCar(raceData.updateCarId, carData);
      const carIndex = raceData.carsData.findIndex((car) => {
        return car.id === raceData.updateCarId;
      });
      raceData.carsData.splice(carIndex, 1, updatedCar);
      raceData.updateCarId = 0;
    }
    this.garageView.drawGarage();
  }
}

export default GarageController;
