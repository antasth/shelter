import { createElement } from '../../../utils/utils';

class Menu {
  public createHeader(): HTMLElement {
    const header = createElement('header', ['header'], '', null);
    createElement('button', ['button', 'header__button', 'button__garage'], 'Garage', header);
    createElement('button', ['button', 'header__button', 'button__winners'], 'Winners', header);
    createElement('h2', ['header__text'], 'ASYNC RACE', header);
    return header;
  }

  public createMenu(): HTMLElement {
    const menu = createElement('section', ['menu'], '', null);
    menu.append(this.createInputBlock('create'), this.createInputBlock('update'));
    const controls = createElement('div', ['menu__controls'], '', menu);
    controls.append(this.createMenuButton('race'), this.createMenuButton('reset'), this.createMenuButton('generate'));
    return menu;
  }

  private createMenuButton(buttonName: string): HTMLElement {
    const menuButton = createElement(
      'button',
      ['button', `button__${buttonName}`, 'menu__controls__button'],
      buttonName.toUpperCase(),
      null
    );
    return menuButton;
  }

  private createInputBlock(buttonName: string): HTMLElement {
    const menuBlock = createElement('div', ['menu__block'], '', null);
    const menuInput = createElement('input', [`input__${buttonName}`, 'input__text'], '', menuBlock);
    menuInput.setAttribute('type', 'text');
    const menuColor = createElement('input', [`input__${buttonName}`, 'input__color'], '', menuBlock);
    menuColor.setAttribute('type', 'color');
    menuColor.setAttribute('value', '#ffffff');
    createElement(
      'button',
      ['button', `button__${buttonName}`, 'menu__block__button'],
      buttonName.toUpperCase(),
      menuBlock
    );
    return menuBlock;
  }
}

export default Menu;
