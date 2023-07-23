import { getElement } from '../../functions/functions';
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
    const modalContainer = getElement('.modal__content');
    modalContainer.innerText = String(winner.id);
  }
}
export default ModalController;
