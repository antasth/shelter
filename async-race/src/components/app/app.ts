import * as garage from '../../api/garage';
import * as winners from '../../api/winners';
import { CARS_ON_PAGE, WINNERS_ON_PAGE } from '../../data/constants';
import raceData from '../../data/raceData';
import Listeners from '../controller/listeners';
import Garage from '../view/garage';
import Winners from '../view/winners';

await garage.getCars(raceData.currentPage, CARS_ON_PAGE);
await winners.getWinners(raceData.currentPage, WINNERS_ON_PAGE, 'id', 'ASC');

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
    console.log(raceData);
  }
}

export default App;
