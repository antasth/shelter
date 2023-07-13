import { createElement } from '../../../functions/functions';
import { CarObject } from '../../../interfaces/interfaces';

class Car {
  public drawCar(car: CarObject, parentElement: HTMLElement): void {
    console.log('car', car);
    createElement('div', ['car'], car.name, parentElement);
  }
}

export default Car;
