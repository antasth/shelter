import raceData from '../../data/raceData';
import { createElement, getElement } from '../../functions/functions';
import { ResponseCarObject } from '../../interfaces/interfaces';
import Menu from './modules/menu';

class Garage {
  private menu: Menu;

  constructor() {
    this.menu = new Menu();
  }

  public drawGarage(): void {
    const body = getElement('body');
    body.replaceChildren();
    const main = createElement('main', ['main'], '', null);
    body.append(this.menu.drawHeader(), main);
    main.append(this.menu.drawMenu());
    const garage = createElement('section', ['garage'], '', main);
    const garageCount = createElement('div', ['garage__header'], '', garage);
    createElement('h2', ['garage__header__text'], 'Garage', garageCount);
    createElement('span', ['garage__header__count'], raceData.carsInGarageCount, garageCount);
    createElement('h3', ['garage__page'], 'Page', garage);
    const garageContent = createElement('div', ['garage__content'], '', garage);
    console.log('raceData', raceData.carsData);

    raceData.carsData.forEach((car) => {
      this.drawCarBlock(garageContent, car);
    });
  }

  private drawCarBlock(parentElement: HTMLElement, car: ResponseCarObject): void {
    const carItem = createElement('div', ['garage__item'], '', parentElement);
    carItem.setAttribute('data-index', String(car.id));
    const carItemHeader = createElement('div', ['garage__item__header'], '', carItem);
    createElement('button', ['button', 'button__select', 'garage__header__button'], 'SELECT', carItemHeader);
    createElement('button', ['button', 'button__remove', 'garage__header__button'], 'REMOVE', carItemHeader);
    createElement('p', ['garage__header__carname'], car.name, carItemHeader);
    const carContent = createElement('div', ['garage__item__content'], '', carItem);
    const carControls = createElement('div', ['garage__item__content__controls'], '', carContent);
    createElement('button', ['button', 'button__start', 'garage__item__button'], 'A', carControls);
    createElement('button', ['button', 'button__stop', 'garage__item__button'], 'B', carControls);
    const carTrack = createElement('div', ['garage__item__content__track'], '', carContent);
    const carImg = createElement('div', ['garage__item__car'], '', carTrack);
    carImg.setAttribute('data-index', String(car.id));
    carImg.style.backgroundColor = car.color;
    createElement('div', ['garage__item__flag'], '', carTrack);
  }
}

export default Garage;
