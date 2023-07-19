import * as engineRequest from '../../api/engine';
import * as garageRequest from '../../api/garage';
import { BASE_CAR_SPEED, CARS_ON_PAGE } from '../../data/constants';
import raceData from '../../data/raceData';
import { startCarAnimation, stopCarAnimation } from '../../functions/carAnimations';
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
    startCarAnimation(velocity * BASE_CAR_SPEED);
    try {
      await engineRequest.switchToDriveMode(id);
    } catch (error) {
      stopCarAnimation(true);
    }
  }

  public async stopCar(id: number): Promise<void> {
    await engineRequest.stopEngine(id);
    stopCarAnimation();
  }
}

export default GarageController;
