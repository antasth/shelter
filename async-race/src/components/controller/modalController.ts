import raceData from '../../data/raceData';
import { createElement, getElement } from '../../functions/functions';
import { EngineDriveResponse } from '../../interfaces/interfaces';

class ModalController {
  public showModal(): void {
    const modal = getElement('.modal__overlay');
    const marginSize = window.innerWidth - document.documentElement.clientWidth;
    if (marginSize) {
      document.documentElement.style.marginRight = `${marginSize}px`;
    }
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.classList.add('locked');
  }

  public hideModal(): void {
    const modal = getElement('.modal__overlay');

    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.classList.remove('locked');
    document.documentElement.style.marginRight = '0';
  }

  public addModalContent(winner: EngineDriveResponse): void {
    const modalContent = getElement('.modal__content');
    const [winnerCar] = raceData.carsData.filter((car) => {
      return car.id === winner.id;
    });
    // console.log(winnerCar);
    const winMessage = `Победил гонщик №${winnerCar.id} на ${winnerCar.name}`;
    const header = createElement('div', ['modal__content__header'], '', modalContent);
    createElement('h3', ['modal__content__message'], winMessage, header);
    const winImage = createElement('div', ['modal__content__image'], '', modalContent);
    createElement('img', ['modal__content__img'], '', winImage);
    // modalImage.setAttribute('src', '../../assets/gif/gif1.gif');
    // modalContent.innerText = `Победил гонщик №${winnerCar.id} на ${winnerCar.name}`;
  }
}
export default ModalController;
