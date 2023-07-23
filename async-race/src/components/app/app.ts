import * as garage from '../../api/garage';
import * as winners from '../../api/winners';
import appData from '../../data/appData';
import Listeners from '../controller/listeners';
import Garage from '../view/garage';
import Winners from '../view/winners';

await garage.getCars();
await winners.getWinners();

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
    this.garage.drawGarageView();
    this.winners.drawWinners();
    this.listeners.addListeners();
    console.log(appData);
  }
}

export default App;
