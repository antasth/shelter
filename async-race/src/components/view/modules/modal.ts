import { createElement } from '../../../utils/utils';

class Modal {
  public drawModal() {
    const modalOverlay = createElement('div', ['modal__overlay', 'modal__overlay__modal', 'hide'], '', null);
    const modal = createElement('div', ['modal'], '', modalOverlay);
    const modalContainer = createElement('div', ['modal__container'], '', modal);
    createElement('div', ['modal__content'], '', modalContainer);
    createElement('button', ['modal__close'], 'X', modalContainer);
    return modalOverlay;
  }
}

export default Modal;
