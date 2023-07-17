import * as request from '../../api/garage';
import { CarObject } from '../../interfaces/interfaces';
import Listeners from '../controller/buttonListeners';
import Garage from '../view/garage';

const cars = await request.getCars();

class App {
  public garage: Garage;

  private listeners: Listeners;

  public cars: CarObject[];

  constructor() {
    this.cars = cars;
    this.garage = new Garage(this.cars);
    this.listeners = new Listeners();
  }

  public start(): void {
    this.garage.drawGarage();
    this.listeners.addListeners();
  }
}

export default App;
