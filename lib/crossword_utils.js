import R from 'ramda';

import { wordPatterns, middleRowPatterns } from './patterns.js';

const BLACK_TILE = 0;
const WHITE_TILE = 1;
const EMPTY_TILE = 2;

const isTile = type => tile => parseInt(tile, 10) === type;
const isWhiteTile = isTile(WHITE_TILE);
// const isBlackTile = isTile(BLACK_TILE);

const replaceAt = (str, index, character) =>
  str.substr(0, index) + character + str.substr(index + character.length);

const getRandomArbitrary = (min, max) => parseInt(Math.random() * (max - min) + min, 10);

const transpose = grid =>
  grid[0].split('').map((col, colIndex) => grid.map(row => row[colIndex]).join(''));

export const fixInvalidWords = grid => {
  return R.addIndex(R.map)((row, index) => {
    if (index > 8 || '1357'.match(index)) return row;

    const validPattern = R.filter(pattern => pattern === row, wordPatterns);

    if (validPattern.length > 0) return row;

    const twoInvalid = /^(1*0)?(1{1,3})0(1{1,3})(01*)?$/g;
    if (twoInvalid.test(row)) {
      return row.replace(twoInvalid, '$1$21$3$4');
    }

    if (row.match(/11101111/)) {
      return row.replace(/11101111/, '11111111');
    }

    if (row.match(/1111111110111/)) {
      return row.replace(/1111111110111/, '1111111111111');
    }

    return row;
  }, grid);
};

const symmetricalize = grid => {
  const gridSize = grid.length;
  const gridString = grid.join('');
  const middleChar = grid[parseInt(gridSize / 2, 10)][parseInt(gridSize / 2, 10)];
  const firstHalf = gridString.substring(0, parseInt(gridString.length / 2, 10));
  const symmetricalGridString = `${firstHalf}${middleChar}${R.reverse(firstHalf)}`;
  return R.splitEvery(15, R.map(parseInt, symmetricalGridString.split('')))
    .map(row => row.join(''));
};

const adjustCenterTile = grid => {
  const middleRowIndex = parseInt(grid.length / 2, 10);
  const middleRow = grid[middleRowIndex];
  const middleTileIndex = parseInt(middleRow.length / 2, 10);
  // TODO: if the word in the center tile is valid, consider changing top and bottom
  // if the word is invalid, then change the center tile
  // const aboveMiddleTile = grid[middleTileIndex - 1][middleTileIndex];
  const centerTile = isWhiteTile(middleRow[middleTileIndex - 1]) ? BLACK_TILE : WHITE_TILE;

  return [
    ...grid.slice(0, middleRowIndex),
    replaceAt(middleRow, middleTileIndex, String(centerTile)),
    ...grid.slice(middleRowIndex + 1),
  ];
};

const assignMiddleRow = grid => {
  const randomIndex = getRandomArbitrary(0, middleRowPatterns.length);
  const middleRowPattern = middleRowPatterns[randomIndex];
  const middleTile = isWhiteTile(middleRowPattern[middleRowPattern.length]) ?
    BLACK_TILE : WHITE_TILE;
  const middleRow = middleRowPattern + String(middleTile) + R.reverse(middleRowPattern);
  const middleRowIndex = parseInt(grid.length / 2, 10);
  return [
    ...grid.slice(0, middleRowIndex),
    middleRow,
    ...grid.slice(middleRowIndex + 1),
  ];
};

// TODO: to make this code testable we should extract the randomness from the function, to do this
// we could pass a function with the grid that returns a word pattern to be used.
// For the real application we could have a getRandomWordPattern(), but for test purposes
// we inject a deterministic getWordPattern()
const assignWordRows = grid =>
  R.addIndex(R.map)((row, index) => {
    if (index % 2 === 0) {
      return wordPatterns[getRandomArbitrary(0, wordPatterns.length)];
    }

    return row;
  }, grid);

const assignWordColumns = grid =>
  transpose(
    transpose(grid)
      .map((column, columnIndex) => {
        // instead of always using a word pattern for the first column, we should assign word
        // patterns according to the middle row, so if the middle row has a 1 in the second column,
        // then that column should have the word pattern.
        if (columnIndex % 2 === 0) {
          // const middleRowIndex = parseInt(grid.length / 2, 10);
          // const middleRowTile = grid[middleRowIndex][columnIndex];
          const allowedPatterns = R.filter(
            pattern => {
              const isValid = pattern[0] === column[0] &&
                pattern[2] === column[2] &&
                pattern[4] === column[4] &&
                pattern[6] === column[6] &&
                pattern[7] === column[7];

              return isValid;
            },
            wordPatterns
          );

          if (allowedPatterns.length === 0) {
            allowedPatterns.push(wordPatterns[getRandomArbitrary(0, wordPatterns.length)]);
          }

          // do not change rows 1, 3, 5, 7, 8
          // use three state variables, to indicate tiles that don't have any assignment (null)
          return allowedPatterns[getRandomArbitrary(0, allowedPatterns.length)];
        }

        return column;
      })
  );

const initGrid = size => {
  const sizeRange = R.range(0, size);
  return sizeRange.map(() => sizeRange.map(() => EMPTY_TILE).join(''));
};

// blank grid  CHECK!
// => assigns word rows CHECK!
// => assign middle row CHECK!
// => adjust center tile CHECK!
// => assigns word cols
// => symmetrical CHECK!

export function generateCrosswordPattern() {
  const size = 15;
  let grid = initGrid(size);
  grid = assignWordRows(grid);
  grid = assignMiddleRow(grid);
  grid = adjustCenterTile(grid);
  grid = assignWordColumns(grid);


  grid = symmetricalize(grid);
  // grid = adjustCenterTile(grid);
  return grid;
}
