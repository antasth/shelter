import { createElement, getElement } from '../../functions/functions';

class Winners {
  public drawWinners() {
    const body = getElement('body');
    const winners = createElement('div', ['winners'], '', body);
    const title = createElement('h1', ['winners__title'], 'Winners(1)', winners);
    const subTitle = createElement('h3', ['winners__subtitle'], 'Page(1)', winners);
    console.log(title, subTitle);
    const winnersTable = createElement('table', ['winners__table'], '', winners);
    const tableHead = createElement('thead', ['table__head'], '', winnersTable);
    const tableHeadRow = createElement('tr', ['table__row'], '', tableHead);
    createElement('th', null, '№', tableHeadRow);
    createElement('th', null, 'Car', tableHeadRow);
    createElement('th', null, 'Name', tableHeadRow);
    createElement('th', null, 'Wins', tableHeadRow);
    createElement('th', null, 'Best Time', tableHeadRow);

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
