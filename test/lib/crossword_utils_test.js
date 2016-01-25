import { expect } from 'chai';
import R from 'ramda';

import { generateCrosswordPattern, toString } from '../../lib/crossword_utils.js';

const forEachIndex = R.addIndex(R.forEach);

describe('generateCrosswordPattern', function () {
  beforeEach(function () {
    this.grid = generateCrosswordPattern();
  })

  it('returns a two dimensional array of 15 by 15', function () {
    expect(this.grid.length).to.equal(15);
    this.grid.map(i => i.length).forEach(l => expect(l).to.equal(15));
  });

  it('returns values of either 1 or 0', function () {
    const notOneOrZero = v => v !== 1 && v !== 0;
    expect(R.flatten(this.grid).filter(notOneOrZero).length).to.equal(0);
  });

  it('returns different numbers each time', function() {
    const grid1 = toString(this.grid);
    const grid2 = toString(generateCrosswordPattern());
    expect(grid1).to.not.equal(grid2);
  });

  it('returns a symmetrical grid pattern', function () {
    const gridString = toString(this.grid);
    const formerHalf = gridString.substring(0, parseInt(gridString.length / 2));
    const latterHalf = gridString.substring(parseInt(gridString.length / 2) + 1);
    expect(formerHalf).to.equal(R.reverse(latterHalf));
  });

  // it('returns a grid with no completely disconnected tiles', function() {
  //   const grid = this.grid;
  //   let isolatedCellFound = false;
  //   forEachIndex(function(row, rowIdx) {
  //     forEachIndex(function(cell, colIdx) {
  //       const topCell = colIdx - 1 >= 0 ? grid[rowIdx][colIdx - 1] : 0;
  //       const leftCell = rowIdx - 1 >= 0 ? grid[rowIdx - 1][colIdx] : 0;
  //       const rightCell = rowIdx + 1 < 15 ? grid[rowIdx + 1][colIdx] : 0;
  //       const bottomCell = colIdx + 1 < 15 ? grid[rowIdx][colIdx + 1] : 0;
  //       if (bottomCell === 0 && leftCell === 0 && topCell === 0 && rightCell === 0) {
  //         isolatedCellFound = true;
  //       }
  //     }, row);
  //   }, this.grid);
  //   expect(isolatedCellFound).to.equal(false);
  // });

});
