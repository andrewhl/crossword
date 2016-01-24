import React, { Component } from 'react';
import R from 'ramda';

const grid = [
  {
    width: 15
  }
]

const crossword = [
  {
    position: [0, 0],
    word: 'anapest',
    direction: 'across',
  },
  {
    position: [8, 0],
    word: 'drachma',
    direction: 'across',
  }
]

export default class Crossword extends Component {

  render() {
    let rows = R.map(this.createRow.bind(this), this.props.data);

    return (
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }

  createRow(row) {
    let cells = R.map(this.createCell.bind(this), row);

    return (
      <tr>
        {cells}
      </tr>
    )
  }

  createCell(cell) {
    let className = (cell !== '') ? '' : 'empty';
    return (
      <td>
        <div className={className}>{cell}</div>
      </td>
    )
  }
}
