import appData from '../../data/appData';
import { ResponseCarObject } from '../../interfaces/interfaces';
import { createElement, getElement } from '../../utils/utils';
import Menu from './modules/menu';
import Modal from './modules/modal';

class Garage {
  private menu: Menu;

  private modal: Modal;

  constructor() {
    this.menu = new Menu();
    this.modal = new Modal();
  }

  public drawGarageView(): void {
    const body = getElement('body');
    body.replaceChildren();
    const main = createElement('main', ['main'], '', null);
    body.append(this.menu.createHeader(), main, this.modal.createModalWindow());
    main.append(this.menu.createMenu());
    const garage = createElement('section', ['garage'], '', main);
    garage.append(this.createGarageWrapper());
    createElement('div', ['body__image'], '', body);
  }

  public redrawGarage(): void {
    const garage = getElement('.garage');
    garage.replaceChildren();
    garage.append(this.createGarageWrapper());
  }

  private createGarageWrapper(): HTMLElement {
    const garageWrapper = createElement('div', ['garage__wrapper'], '', null);
    const garageCount = createElement('div', ['garage__header'], '', garageWrapper);
    createElement('h3', ['garage__header__text'], 'Garage', garageCount);
    createElement('span', ['garage__header__count'], appData.carsCount, garageCount);
    const pageCount = createElement('div', ['garage__subheader'], '', garageWrapper);
    createElement('h3', ['garage__page'], 'Page', pageCount);
    createElement('button', ['button', 'garage__nav__button-prev'], '<', pageCount);
    createElement('span', ['garage__page'], appData.garagePage, pageCount);
    createElement('button', ['button', 'garage__nav__button-next'], '>', pageCount);
    const garageContent = createElement('div', ['garage__content'], '', garageWrapper);
    appData.carsData.forEach((car) => {
      this.drawCarBlock(garageContent, car);
    });
    return garageWrapper;
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
    const startButton = createElement('button', ['button', 'button__start', 'garage__item__button'], 'A', carControls);
    const stopButton = createElement('button', ['button', 'button__stop', 'garage__item__button'], 'B', carControls);
    startButton.setAttribute('data-index', String(car.id));
    stopButton.setAttribute('data-index', String(car.id));
    stopButton.setAttribute('disabled', 'true');
    const carTrack = createElement('div', ['garage__item__content__track'], '', carContent);
    const carImg = createElement('div', ['garage__item__car'], '', carTrack);
    carImg.setAttribute('data-index', String(car.id));
    carImg.style.backgroundColor = car.color;
    createElement('div', ['garage__item__flag'], '', carTrack);
  }
}

export default Garage;
