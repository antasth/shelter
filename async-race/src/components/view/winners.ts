import * as garageRequest from '../../api/garage';
import appData from '../../data/appData';
import { createElement, getElement } from '../../functions/functions';

class Winners {
  public drawWinners() {
    const body = getElement('body');
    const winners = createElement('div', ['winners'], '', body);
    const winnersWrapper = createElement('div', ['winners__wrapper'], '', winners);
    const title = createElement('h1', ['winners__title'], 'Winners(1)', winnersWrapper);
    const subTitle = createElement('h3', ['winners__subtitle'], 'Page(1)', winnersWrapper);
    console.log(title, subTitle);
    const winnersTable = createElement('table', ['winners__table'], '', winnersWrapper);
    const tableHead = createElement('thead', ['table__head'], '', winnersTable);
    const tableHeadRow = createElement('tr', ['table__row'], '', tableHead);
    createElement('th', null, '№', tableHeadRow);
    createElement('th', null, 'Car', tableHeadRow);
    createElement('th', null, 'Name', tableHeadRow);
    createElement('th', null, 'Wins', tableHeadRow);
    createElement('th', null, 'Best Time(s)', tableHeadRow);
    const tableBody = createElement('tbody', null, '', winnersTable);
    console.log(appData.winnersData);

    appData.winnersData.forEach(async (winner, i) => {
      const winnerCar = await garageRequest.getCar(winner.id);
      const tableBodyRow = createElement('tr', ['table__row'], '', tableBody);
      createElement('td', null, i + 1, tableBodyRow);
      const imgContainer = createElement('td', null, '', tableBodyRow);
      const carImg = createElement('div', ['winners__car__img'], '', imgContainer);
      console.log('winnerCar', winnerCar);
      carImg.style.backgroundColor = winnerCar.color;
      createElement('td', null, winnerCar.name, tableBodyRow);
      createElement('td', null, winner.wins, tableBodyRow);
      createElement('td', null, winner.time, tableBodyRow);
    });
  }
}

export default Winners;
