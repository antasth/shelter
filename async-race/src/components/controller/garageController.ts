import * as garageRequest from '../../api/garage';
import { CARS_ON_PAGE } from '../../data/constants';
import raceData from '../../data/raceData';
import Garage from '../view/garage';

class GarageController {
  private garageView: Garage;

  constructor() {
    this.garageView = new Garage();
  }

  public async deleteCarFromGarage(carId: number, targetCarItem: Element) {
    await garageRequest.deleteCar(carId);
    await garageRequest.getCars(raceData.currentPage, CARS_ON_PAGE);
    targetCarItem.remove();
    this.garageView.drawGarage();
  }
}
export default GarageController;
