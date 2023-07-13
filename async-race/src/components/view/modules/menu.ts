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
    menu.append(this.drawInputBlock('CREATE'), this.drawInputBlock('UPDATE'));
    const controls = createElement('div', ['menu__controls'], '', menu);
    controls.append(this.drawMenuButton('Race'), this.drawMenuButton('Reset'), this.drawMenuButton('Generate'));
    return menu;
  }

  private drawMenuButton(buttonText: string): HTMLElement {
    const menuButton = createElement('button', ['button', 'menu__controls__button'], buttonText, null);
    return menuButton;
  }

  private drawInputBlock(buttonText: string): HTMLElement {
    const menuBlock = createElement('div', ['menu__block'], '', null);
    const menuInput = createElement('input', ['menu__block__input'], '', menuBlock);
    menuInput.setAttribute('type', 'text');
    const menuColor = createElement('input', ['menu__block__color'], '', menuBlock);
    menuColor.setAttribute('type', 'color');
    menuColor.setAttribute('value', '#ffffff');
    createElement('button', ['button', 'menu__block__button'], buttonText, menuBlock);
    return menuBlock;
  }
}

export default Menu;
