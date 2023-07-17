import * as request from '../../api/request';
// import { createRandomCarName, getElement, getRandomColor } from '../../functions/functions';
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
    // const del = getElement('.garage__header__button');
    // del.addEventListener('click', () => {
    //   request.deleteCar(9);
    // });
    // const add = getElement('.garage__item__button');
    // add.addEventListener('click', () => {
    //   request.createCar({
    //     name: createRandomCarName(),
    //     color: getRandomColor()
    //   });
    // });
  }
}

export default App;
