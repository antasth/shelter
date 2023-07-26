import appData from '../../data/appData';
import { createElement, getElement } from '../../utils/utils';

class Winners {
  public drawWinnersView(): void {
    const body = getElement('body');
    const winners = createElement('div', ['winners'], '', body);
    const winnersWrapper = createElement('div', ['winners__wrapper'], '', winners);
    winnersWrapper.append(this.createWinnersHeader(), this.createWinnersTable());
  }

  public redrawWinnersTable(): void {
    const winnersWrapper = getElement('.winners__wrapper');
    winnersWrapper.replaceChildren();
    winnersWrapper.append(this.createWinnersHeader(), this.createWinnersTable());
  }

  private createWinnersHeader(): HTMLElement {
    const winnersHeader = createElement('div', ['winners__header'], '', null);
    const winnersCount = `Winners(${appData.winnersCount})`;
    createElement('h2', ['winners__title'], winnersCount, winnersHeader);
    const subTitle = createElement('div', ['winners__subtitle'], '', winnersHeader);
    createElement('h3', ['winners__page'], 'Page', subTitle);
    createElement('button', ['button', 'winners__button', 'winners__button__prev'], '<', subTitle);
    createElement('h3', ['winners__subtitle'], appData.winnersPage, subTitle);
    createElement('button', ['button', 'winners__button', 'winners__button__next'], '>', subTitle);
    return winnersHeader;
  }

  private createWinnersTable(): HTMLElement {
    const winnersTable = createElement('table', ['winners__table'], '', null);
    const tableHead = createElement('thead', ['table__head'], '', winnersTable);
    const tableHeadRow = createElement('tr', ['table__row'], '', tableHead);
    createElement('th', null, '№', tableHeadRow);
    createElement('th', null, 'Car', tableHeadRow);
    createElement('th', null, 'Car Name', tableHeadRow);
    createElement('th', ['table__wins'], 'Wins', tableHeadRow);
    createElement('th', ['table__time'], 'Best Time(s)', tableHeadRow);
    const tableBody = createElement('tbody', null, '', winnersTable);

    try {
      appData.winnersData.forEach((winner, i) => {
        const [winnerCar] = appData.winnerCarsList.filter((car) => {
          return car.id === winner.id;
        });
        const tableBodyRow = createElement('tr', ['table__row'], '', tableBody);
        createElement('td', null, i + 1, tableBodyRow);
        const imgContainer = createElement('td', null, '', tableBodyRow);
        const carImg = createElement('div', ['winners__car__img'], '', imgContainer);
        carImg.style.backgroundColor = winnerCar.color;
        createElement('td', null, winnerCar.name, tableBodyRow);
        createElement('td', null, winner.wins, tableBodyRow);
        createElement('td', null, winner.time, tableBodyRow);
      });
    } catch (error) {
      if (error instanceof Error) console.log('draw error');
    }

    return winnersTable;
  }
}

export default Winners;
