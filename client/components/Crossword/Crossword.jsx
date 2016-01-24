import React, { Component } from 'react';
import R from 'ramda';

const mapWithIndex = R.addIndex(R.map);

export default class Crossword extends Component {

  render() {
    const rows = mapWithIndex(this.createRow.bind(this), this.props.data);

    return (
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }

  createRow(row, index) {
    const cells = mapWithIndex(this.createCell.bind(this), row);

    return (
      <tr key={index}>
        {cells}
      </tr>
    )
  }

  createCell(cell, index) {
    const className = (cell !== '') ? '' : 'empty';

    return (
      <td key={index}>
        <div className={className}>{cell}</div>
      </td>
    )
  }
}
