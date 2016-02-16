import { expect } from 'chai';
// import R from 'ramda';

import {
  fixInvalidWords,
  generateCrosswordPattern,
} from '../../lib/crossword_utils.js';

const h = row => row.replace(/0/g, '-');
const z = row => row.replace(/\-/g, '0');
const setRow = (grid, rowNumber, row) => grid[rowNumber - 1] = row;
const getRow = (grid, rowNumber) => grid[rowNumber - 1];

describe('fixInvalidWords', () => {
  let grid;

  beforeEach(() => {
    grid = generateCrosswordPattern();
  });

  it('joins a leading invalid pattern to a valid pattern', () => {
    setRow(grid, 1, z('-111-1111-1111-'));
    expect(h(getRow(fixInvalidWords(grid), 1))).to.equal('-11111111-1111-');
  });

  it('joins a trailing invalid pattern to a valid pattern', () => {
    setRow(grid, 1, z('-111111111-111-'));
    expect(h(getRow(fixInvalidWords(grid), 1))).to.equal('-1111111111111-');
  });

  it('joins two leading invalid patterns together', () => {
    setRow(grid, 1, z('-1-111-11111'));
    expect(h(getRow(fixInvalidWords(grid), 1))).to.equal('-11111-11111');
  });

  it('joins two starting invalid patterns together', () => {
    setRow(grid, 1, z('1-111-11111'));
    expect(h(getRow(fixInvalidWords(grid), 1))).to.equal('11111-11111');
  });

  it('joins to trailing invalid patterns together', () => {
    setRow(grid, 1, z('11111-11-111'));
    expect(h(getRow(fixInvalidWords(grid), 1))).to.equal('11111-111111');
  });
});

// import {
//   adjustCenterTile,
//   generateCrosswordPattern,
//   toString,
//   validMiddleRowPatterns,
//   validWordPatterns,
// } from '../../lib/crossword_utils.js';
//
// // const forEachIndex = R.addIndex(R.forEach);
// // const indexedMap = R.addIndex(R.map);
//
// describe('generateCrosswordPattern', () => {
//   let grid;
//
//   beforeEach(() => {
//     grid = generateCrosswordPattern();
//   });
//
//   it('returns an array of 15 strings with 15 characters', () => {
//     expect(grid.length).to.equal(15);
//     grid.forEach(l => expect(l).to.be.a('String'));
//   });
//
//   it('returns values of either 1 or 0', () => {
//     grid.forEach(p => expect(p).to.match(/^[10]+$/));
//   });
//
//   it('returns different numbers each time', () => {
//     const grid1 = toString(grid);
//     const grid2 = toString(generateCrosswordPattern());
//     expect(grid1).to.not.equal(grid2);
//   });
//
//   it('returns a symmetrical grid pattern', () => {
//     const gridString = toString(grid);
//     const formerHalf = gridString.substring(0, parseInt(gridString.length / 2, 10));
//     const latterHalf = gridString.substring(parseInt(gridString.length / 2, 10) + 1);
//     expect(formerHalf).to.equal(R.reverse(latterHalf));
//   });
//
//   it('starts with a word row', () => {
//     expect(validWordPatterns).to.include(grid[0]);
//   });
//
//   it('has a valid middle row', () => {
//     const middleRow = grid[7].substring(0, 7);
//     expect(middleRow).not.to.match(/11/g);
//     expect(validMiddleRowPatterns).to.include(middleRow);
//   });
//
//   // it('returns a grid with no completely disconnected tiles', () => {
//   //   let isolatedCellFound = false;
//   //   forEachIndex((row, rowIdx) => {
//   //     forEachIndex((cell, colIdx) => {
//   //       const topCell = colIdx - 1 >= 0 ? grid[rowIdx][colIdx - 1] : 0;
//   //       const leftCell = rowIdx - 1 >= 0 ? grid[rowIdx - 1][colIdx] : 0;
//   //       const rightCell = rowIdx + 1 < 15 ? grid[rowIdx + 1][colIdx] : 0;
//   //       const bottomCell = colIdx + 1 < 15 ? grid[rowIdx][colIdx + 1] : 0;
//   //       if (bottomCell === 0 && leftCell === 0 && topCell === 0 && rightCell === 0) {
//   //         isolatedCellFound = true;
//   //       }
//   //     }, row);
//   //   }, grid);
//   //   expect(isolatedCellFound).to.equal(false);
//   // });
// });
//
// describe('adjustCenterTile', () => {
//   let grid;
//
//   beforeEach(() => {
//     grid = generateCrosswordPattern();
//   });
//
//   it('should be 1 if the sides are 0', () => {
//     grid[7] = '000000000000000';
//     expect(adjustCenterTile(grid)[7]).to.equal('000000010000000');
//   });
//
//   it('should be 0 if the sides are 1', () => {
//     grid[7] = '000000111000000';
//     expect(adjustCenterTile(grid)[7]).to.equal('000000101000000');
//   });
// });
//
// describe('validWordPatterns', () => {
//   it('should be an array', () => {
//     expect(validWordPatterns).to.be.a('Array');
//   });
//
//   it('has a length of 15 items', () => {
//     validWordPatterns.forEach(pattern => {
//       expect(pattern.length).to.equal(15);
//     });
//   });
//
//   it('should have at least one black (zero) tile', () => {
//     validWordPatterns.forEach(pattern => {
//       expect(pattern).to.include(0);
//     });
//   });
//
//   it('does not have two or more consecutive black tiles', () => {
//     validWordPatterns.forEach(pattern => {
//       expect(pattern).not.to.include('00');
//     });
//   });
//
//   it('can have a word length of at least 4 characters', () => {
//     validWordPatterns.forEach(pattern => {
//       expect(pattern).not.to.match(/^1110|01110|0111$/);
//     });
//   });
//
//   it('cannot have a word length greater than 10 characters', () => {
//     validWordPatterns.forEach(pattern => {
//       expect(pattern).not.to.match(/1{11}/);
//     });
//   });
// });
