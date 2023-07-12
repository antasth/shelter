import Loader from '../controller/loader';
import Garage from '../view/garage';

class App {
  public garage: Garage;

  public loader: Loader;

  constructor() {
    this.garage = new Garage();
    this.loader = new Loader();
  }

  public start(): void {
    this.garage.drawGarage();
    this.loader.getCars();
  }
}

export default App;
