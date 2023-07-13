import { getElement } from '../../functions/functions';
import { CarObject } from '../../interfaces/interfaces';
import Car from './modules/car';

class Garage {
  private cars: CarObject[];

  private car: Car;

  constructor(cars: CarObject[]) {
    this.cars = cars;
    this.car = new Car();
  }

  public drawGarage() {
    console.log(this.cars);
    const body = getElement('body');
    this.cars.forEach((car) => {
      this.car.drawCar(car, body);
    });
  }
}

export default Garage;
