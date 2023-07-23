import * as garage from '../../api/garage';
import * as winners from '../../api/winners';
import appData from '../../data/appData';
import { CARS_ON_PAGE, WINNERS_ON_PAGE } from '../../data/constants';
import { SortOrder, WinnersSort } from '../../interfaces/enum';
import Listeners from '../controller/listeners';
import Garage from '../view/garage';
import Winners from '../view/winners';

await garage.getCars(appData.garagePage, CARS_ON_PAGE);
await winners.getWinners(appData.winnersPage, WINNERS_ON_PAGE, WinnersSort.id, SortOrder.asc);

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
    console.log(appData);
  }
}

export default App;
