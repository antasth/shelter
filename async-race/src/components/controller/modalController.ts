import gif1 from '../../assets/gif/gif1.gif';
import gif2 from '../../assets/gif/gif2.gif';
import gif3 from '../../assets/gif/gif3.gif';
import gif4 from '../../assets/gif/gif4.gif';
import appData from '../../data/appData';
import { createElement, getElement, getRandomNumber, getTimeInSeconds } from '../../functions/functions';
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
    modalContent.replaceChildren();
    const [winnerCar] = appData.carsData.filter((car) => {
      return car.id === winner.id;
    });
    const winTime = getTimeInSeconds(winner.time);
    const winMessage = winner.success
      ? `Победил гонщик №${winnerCar.id} на ${winnerCar.name} время (${winTime})`
      : 'К сожалению, все машины сломались';
    const header = createElement('div', ['modal__content__header'], '', modalContent);
    createElement('h5', ['modal__content__message'], winMessage, header);
    const winImageContainer = createElement('div', ['modal__content__image'], '', modalContent);
    const winImage = createElement('img', ['modal__content__img'], '', winImageContainer);
    if (winImage instanceof HTMLImageElement) {
      const randomGif = getRandomNumber(3) + 1;
      switch (randomGif) {
        case 1: {
          winImage.src = gif1;
          break;
        }
        case 2: {
          winImage.src = gif2;
          break;
        }
        case 3: {
          winImage.src = gif3;
          break;
        }
        default: {
          winImage.src = gif1;
        }
      }
      if (!winner.success) winImage.src = gif4;
    }
  }
}
export default ModalController;
