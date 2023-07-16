import * as request from '../../api/request';
import { CarObject } from '../../interfaces/interfaces';
import Garage from '../view/garage';

const cars = await request.getCars();

class App {
  public garage: Garage;

  public cars: CarObject[];

  constructor() {
    this.cars = cars;
    this.garage = new Garage(this.cars);
  }

  public start(): void {
    this.garage.drawGarage();
  }
}

export default App;
