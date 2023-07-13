import { createElement, getElement } from '../../functions/functions';
import { CarObject } from '../../interfaces/interfaces';
import Menu from './modules/menu';

class Garage {
  private cars: CarObject[];

  private menu: Menu;

  constructor(cars: CarObject[]) {
    this.cars = cars;
    this.menu = new Menu();
  }

  public drawGarage(): void {
    const body = getElement('body');
    const main = createElement('main', ['main'], '', null);
    body.append(this.menu.drawHeader(), main);
    main.append(this.menu.drawMenu());
    const garage = createElement('section', ['garage'], '', main);
    createElement('h2', ['garage__header'], 'Garage', garage);
    createElement('h3', ['garage__page'], 'Page', garage);
    const garageContent = createElement('div', ['garage__content'], '', garage);
    this.cars.forEach((car) => {
      this.drawCarBlock(garageContent, car);
    });
  }

  private drawCarBlock(parentElement: HTMLElement, car: CarObject) {
    const carItem = createElement('div', ['garage__item'], '', parentElement);
    const carItemHeader = createElement('div', ['garage__item__header'], '', carItem);
    createElement('button', ['button', 'garage__header__button'], 'SELECT', carItemHeader);
    createElement('button', ['button', 'garage__header__button'], 'REMOVE', carItemHeader);
    createElement('p', ['garage__header__carname'], car.name, carItemHeader);
    console.log(car);
    const carContent = createElement('div', ['garage__item__content'], '', carItem);
    createElement('button', ['button', 'garage__item__button'], 'A', carContent);
    createElement('button', ['button', 'garage__item__button'], 'B', carContent);
    createElement('div', ['garage__item__car'], '', carContent);
  }
}

export default Garage;
