import { createElement } from '../../../functions/functions';

class Menu {
  public drawHeader(): HTMLElement {
    const header = createElement('header', ['header'], '', null);
    createElement('button', ['button', 'header__button'], 'Garage', header);
    createElement('button', ['button', 'header__button'], 'Winners', header);
    createElement('h1', ['header__text'], 'ASYNC RACE', header);
    return header;
  }

  public drawMenu(): HTMLElement {
    const menu = createElement('section', ['menu'], '', null);
    menu.append(this.drawInputBlock('create'), this.drawInputBlock('update'));
    const controls = createElement('div', ['menu__controls'], '', menu);
    controls.append(this.drawMenuButton('race'), this.drawMenuButton('reset'), this.drawMenuButton('generate'));
    return menu;
  }

  private drawMenuButton(buttonName: string): HTMLElement {
    const menuButton = createElement(
      'button',
      ['button', `button__${buttonName}`, 'menu__controls__button'],
      buttonName,
      null
    );
    return menuButton;
  }

  private drawInputBlock(buttonName: string): HTMLElement {
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
