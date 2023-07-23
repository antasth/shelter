import * as request from '../../api/garage';
import { CARS_ON_PAGE } from '../../data/constants';
import raceData from '../../data/raceData';
import Listeners from '../controller/listeners';
import Garage from '../view/garage';
import Winners from '../view/winners';

await request.getCars(raceData.currentPage, CARS_ON_PAGE);

class App {
  private garage: Garage;

  private winners: Winners;

  private listeners: Listeners;

  constructor() {
    this.garage = new Garage();
    this.winners = new Winners();
    this.listeners = new Listeners();
  }

  public start(): void {
    this.garage.drawGarage();
    this.winners.drawWinners();
    this.listeners.addListeners();
  }
}

export default App;
