import appData from '../../data/appData';
import { createElement, getElement } from '../../functions/functions';

class Winners {
  public drawWinnersView(): void {
    const body = getElement('body');
    const winners = createElement('div', ['winners'], '', body);
    const winnersWrapper = createElement('div', ['winners__wrapper'], '', winners);
    const title = createElement('h2', ['winners__title'], `Winners(${appData.winnersCount})`, winnersWrapper);
    const subTitle = createElement('div', ['winners__subtitle'], '', winnersWrapper);
    createElement('h3', ['winners__page'], 'Page', subTitle);
    createElement('button', ['button', 'winners__button', 'winners__button__prev'], '<', subTitle);
    createElement('h3', ['winners__subtitle'], `${appData.winnersPage}`, subTitle);
    createElement('button', ['button', 'winners__button', 'winners__button__next'], '>', subTitle);
    console.log(title, subTitle);
    winnersWrapper.append(this.drawWinnersTable());
  }

  public redrawWinnersTable(): void {
    const winnersWrapper = getElement('.winners__wrapper');
    const winnersTable = getElement('.winners__table');
    winnersWrapper.replaceChild(this.drawWinnersTable(), winnersTable);
  }

  private drawWinnersTable(): HTMLElement {
    const winnersTable = createElement('table', ['winners__table'], '', null);
    const tableHead = createElement('thead', ['table__head'], '', winnersTable);
    const tableHeadRow = createElement('tr', ['table__row'], '', tableHead);
    createElement('th', null, '№', tableHeadRow);
    createElement('th', null, 'Car', tableHeadRow);
    createElement('th', null, 'Car Name', tableHeadRow);
    createElement('th', ['table__wins'], 'Wins', tableHeadRow);
    createElement('th', ['table__time'], 'Best Time(s)', tableHeadRow);
    const tableBody = createElement('tbody', null, '', winnersTable);

    appData.winnersData.forEach((winner, i) => {
      console.log(appData.winnerCarsList);

      const [winnerCar] = appData.winnerCarsList.filter((car) => {
        return car.id === winner.id;
      });
      console.log(winnerCar);

      const tableBodyRow = createElement('tr', ['table__row'], '', tableBody);
      createElement('td', null, i + 1, tableBodyRow);
      const imgContainer = createElement('td', null, '', tableBodyRow);
      const carImg = createElement('div', ['winners__car__img'], '', imgContainer);
      carImg.style.backgroundColor = winnerCar.color;
      createElement('td', null, winnerCar.name, tableBodyRow);
      createElement('td', null, winner.wins, tableBodyRow);
      createElement('td', null, winner.time, tableBodyRow);
    });
    return winnersTable;
  }
}

export default Winners;
