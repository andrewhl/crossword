import React, {
  PropTypes
} from 'react';
import R from 'ramda';

const mapWithIndex = R.addIndex(R.map);

const numberify = string => {
  let computedString = [];
  let tempCount = 0;
  R.addIndex(R.map)(
    (letter, index) => {
      if (parseInt(letter, 10) === 0) {
        computedString.push(tempCount);
        tempCount = 0;
      } else {

        if (typeof(string[index + 1]) === 'undefined') {
          computedString.push(tempCount);
          tempCount = 0;
          return;
        }

        tempCount += 1;

        if (parseInt(string[index + 1], 10) === 0) {
          computedString.push(tempCount);
          tempCount = 0;
        }
      }
    }, string
  );

  return computedString.join('');
}

export default class Crossword extends React.Component {
  static propTypes = {
    data: PropTypes.array
  };

  renderColumnNumbersRow = () => <tr>
    <td></td>
    {mapWithIndex(i => <td key={i} className="number">{i + 1}</td>, R.range(0, 15))}
  </tr>;

  renderRow = (row, index) => {


    return (
      <tr key={index}>
        <td className="number">{index + 1}</td>
        {mapWithIndex(this.renderCell.bind(this), row)}
      </tr>
    );
  };

  renderCell = (cell, index) => {
    const className = (cell !== '')
      ? ''
      : 'empty';

    return (
      <td key={index}>
        <div className={className}>{cell}</div>
      </td>
    );
  };

  render () {
    console.log('Numberify: ', numberify('01101110111111'));

    // console.log('Numberify: ', numberify('11101110111111'));
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
