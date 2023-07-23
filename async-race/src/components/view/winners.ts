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
    createElement('th', null, 'Best Time', tableHeadRow);
    const tableBody = createElement('tbody', null, '', winnersTable);
    console.log(appData.winnersData);

    appData.winnersData.forEach((winner, i) => {
      const tableBodyRow = createElement('tr', ['table__row'], '', tableBody);
      tableBodyRow.innerHTML = `
      <td>${i + 1}
      <td>${'CAR'}</td>
      <td>${'NAME'}</td>
      <td>${winner.wins}</td>
      <td>${winner.time}</td>
      `;
    });
    // data.forEach((element) => {
    //   const tableRow = document.createElement('tr')
    //   tableRow.classList.add('results__table-row')
    //   tableRow.innerHTML = `
    //   <td>${i++}</td>
    //   <td>${element.board}</td>
    //   <td>${element.bombs}</td>
    // <td>${element.time}</td>
    //   <td>${element.moves}</td>
    //   `
    //   resultsTableBody.appendChild(tableRow)
    // })
    //   <table class="table">
    //   <thead>
    //     <tr>
    //       <th>№</th>
    //       <th>Car</th>
    //       <th>Name</th>
    //       <th>Wins</th>
    //       <th>Best Time</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <tr>
    //       <td>1</td>
    //       <td>Reeves</td>
    //       <td>dsfsdf</td>
    //       <td>10</td>
    //       <td>32</td>
    //     </tr>
    //   </tbody>
    // </table>
  }
}

export default Winners;
