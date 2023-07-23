import { createElement, getElement } from '../../../functions/functions';

class Modal {
  public drawModal() {
    const body = getElement('body');
    const modalOverlay = createElement('div', ['modal__overlay', 'modal__overlay__modal', 'hide'], '', body);
    const modal = createElement('div', ['modal'], '', modalOverlay);
    const modalContainer = createElement('div', ['modal__container'], '', modal);
    createElement('div', ['modal__content'], '', modalContainer);
    createElement('button', ['modal__close'], 'X', modalContainer);
  }
}

export default Modal;
