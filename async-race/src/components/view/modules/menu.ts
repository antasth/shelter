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
    menu.append(this.drawInputBlock('CREATE', 'input__create'), this.drawInputBlock('UPDATE', 'input__update'));
    const controls = createElement('div', ['menu__controls'], '', menu);
    controls.append(this.drawMenuButton('race'), this.drawMenuButton('reset'), this.drawMenuButton('generate'));
    return menu;
  }

  private drawMenuButton(buttonText: string): HTMLElement {
    const menuButton = createElement(
      'button',
      ['button', `button__${buttonText}`, 'menu__controls__button'],
      buttonText,
      null
    );
    return menuButton;
  }

  private drawInputBlock(buttonText: string, className: string): HTMLElement {
    const menuBlock = createElement('div', ['menu__block'], '', null);
    const menuInput = createElement('input', [`${className}`, 'input__text'], '', menuBlock);
    menuInput.setAttribute('type', 'text');
    const menuColor = createElement('input', [`${className}`, 'input__color'], '', menuBlock);
    menuColor.setAttribute('type', 'color');
    menuColor.setAttribute('value', '#ffffff');
    createElement('button', ['button', 'button__create', 'menu__block__button'], buttonText, menuBlock);
    return menuBlock;
  }
}

export default Menu;
