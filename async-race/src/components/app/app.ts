import * as request from '../../api/garage';
import { CARS_ON_PAGE } from '../../data/constants';
import raceData from '../../data/raceData';
import Listeners from '../controller/buttonListeners';
import Garage from '../view/garage';

await request.getCars(raceData.currentPage, CARS_ON_PAGE);

class App {
  private garage: Garage;

  private listeners: Listeners;

  constructor() {
    this.garage = new Garage();
    this.listeners = new Listeners();
  }

  public start(): void {
    this.garage.drawGarage();
    this.listeners.addListeners();
  }
}

export default App;
