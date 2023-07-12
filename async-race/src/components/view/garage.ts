import Car from './modules/car';

class Garage {
  private car: Car;

  constructor() {
    this.car = new Car('lada', 'red');
  }

  public drawGarage() {
    this.car.drawCar();
  }
}

export default Garage;
