import React, { PropTypes } from 'react';
import R from 'ramda';

const mapWithIndex = R.addIndex(R.map);

const numberify = string => {
  // R.replace(/(1)+/g, )
  console.log('Numberify:', string);

  // const oneCounts = R.split('0', string).map(ones => {
  //   return ones.length;
  // });
  let computedString = [];
  let tempCount = 0;
  R.map(letter => {
    console.log(tempCount);
    if (parseInt(letter, 10) === 0) {
      computedString.push(tempCount);
      tempCount = 0;
    }
    tempCount += parseInt(letter, 10);
  }, string);
  // R.addIndex(R.forEach)((item, index) => {
  // }, string);

  return computedString;

  // return oneCounts;
  // return string.match(/(1)+/g)[2].length;
};

export default class Crossword extends React.Component {
  static propTypes = {
    data: PropTypes.array,
  };

  renderColumnNumbersRow = () =>
    <tr>
      <td></td>
      {mapWithIndex(i => <td key={i} className="number">{i + 1}</td>, R.range(0, 15))}
    </tr>
  ;

  renderRow = (row, index) =>
    <tr key={index}>
      <td className="number">{index + 1}</td>
      {mapWithIndex(this.renderCell.bind(this), row)}
    </tr>
  ;

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

  render() {
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
