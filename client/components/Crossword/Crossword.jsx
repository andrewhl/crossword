import './Crossword.scss';

import classNames from 'classnames';
import React, { PropTypes } from 'react';
import R from 'ramda';

import { isWhiteTile } from 'lib/crossword_utils.js';

const mapWithIndex = R.addIndex(R.map);

export default class Crossword extends React.Component {
  static propTypes = {
    crossword: PropTypes.array,
  };

  renderColumnNumbersRow = () =>
    <tr>
      <td></td>
      {R.range(0, 15).map(i => <td key={i} className="cCrossword_number">{i + 1}</td>)}
    </tr>
  ;

  renderRow = (row, index) =>
    <tr key={index}>
      <td className="cCrossword_number">{index + 1}</td>
      {mapWithIndex(this.renderTile, row)}
    </tr>
  ;

  renderTile = (tile, index) => {
    const className = classNames('cCrossword_tile', isWhiteTile(tile) ? '-white' : '-black');
    return (
      <td key={index}>
        <div className={className}>{tile}</div>
      </td>
    );
  };

  render() {
    const { crossword } = this.props;

    return (
      <table className="cCrossword">
        <tbody>
          {this.renderColumnNumbersRow()}
          {mapWithIndex(this.renderRow, crossword)}
        </tbody>
      </table>
    );
  }
}
