import { CarObject } from '../../interfaces/interfaces';
import Loader from '../controller/loader';
import Garage from '../view/garage';

const loader = new Loader();
const cars = await loader.getCars();

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
