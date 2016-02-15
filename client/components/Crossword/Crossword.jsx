import React, { PropTypes } from 'react';
import R from 'ramda';

const mapWithIndex = R.addIndex(R.map);

export default class Crossword extends React.Component {
  static propTypes = {
    data: PropTypes.array,
  };

  renderColumnNumbersRow = () =>
    <tr>
      <td></td>
      {mapWithIndex(i => <td key={i} className="number">{i + 1}</td>, R.range(0, 15))}
    </tr>;

  renderRow = (row, index) =>
    <tr key={index}>
      <td className="number">{index + 1}</td>
      {mapWithIndex(this.renderCell.bind(this), row)}
    </tr>;

  renderCell = (cell, index) => {
    const className = (cell !== '') ? '' : 'empty';

    return (
      <td key={index}>
        <div className={className}>{cell}</div>
      </td>
    );
  };

  render() {
    return (
      <table>
        <tbody>
          {this.renderColumnNumbersRow()}
          {mapWithIndex(this.renderRow.bind(this), this.props.data)}
        </tbody>
      </table>
    );
  }
}
