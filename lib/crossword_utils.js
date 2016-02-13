import R from 'ramda';

export const validWordPatterns = [
  // two words
  '111101111111111',
  '111110111111111',
  '111111011111111',
  '111111101111111',
  '111111110111111',
  '111111111011111',
  '111111111101111',

  // two words starts with blank
  '011110111111111',
  '011111011111111',
  '011111101111111',
  '011111110111111',
  '011111111011111',
  '011111111101111',

  // two words ends with blank
  '111111111011110',
  '111111110111110',
  '111111101111110',
  '111111011111110',
  '111110111111110',
  '111101111111110',

  // two words, blanks on ends
  '011110111111110',
  '011111011111110',
  '011111101111110',
  '011111110111110',
  '011111111011110',

  // three words
  '111110111101111',
  '111101111101111',
  '111101111011111',
  '111101111011110',
  '011110111101111',
];

// sorted by binary value
export const validMiddleRowPatterns = [
  '0001000',
  '0001001',
  '0001010',
  '0010001',
  '0010010',
  '0010100',
  '0010101',
  '0100010',
  '0100100',
  '0100101',
  '0101000',
  '0101001',
  '0101010',
  '1000100',
  '1000101',
  '1001000',
  '1001001',
  '1001010',
  '1010001',
  '1010010',
  '1010100',
  '1010101',
];

const replaceAt = (str, index, character) =>
  str.substr(0, index) + character + str.substr(index + character.length);

const getRandomArbitrary = (min, max) => parseInt(Math.random() * (max - min) + min, 10);

const transpose = grid =>
  grid[0].split('').map((col, colIndex) => grid.map(row => row[colIndex]).join(''));

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
  const middleTile = (middleRow[middleTileIndex - 1] === '1') ? '0' : '1';
  // TODO: return the new modified grid instead of writing on the parameter
  grid[middleRowIndex] = replaceAt(middleRow, middleTileIndex, middleTile);
  return grid;
};

const assignMiddleRow = grid => {
  const randomIndex = getRandomArbitrary(0, validMiddleRowPatterns.length);
  const middleRowPattern = validMiddleRowPatterns[randomIndex];
  const middleTile = middleRowPattern[middleRowPattern.length] === '1' ? '0' : '1';
  const middleRow = middleRowPattern + middleTile + R.reverse(middleRowPattern);
  // TODO: return the new modified grid instead of writing on the parameter
  grid[parseInt(grid.length / 2, 10)] = middleRow;
  return grid;
};

// TODO: to make this code testable we should extract the randomness from the function, to do this
// we could pass a function with the grid that returns a word pattern to be used.
// For the real application we could have a getRandomWordPattern(), but for test purposes
// we inject a deterministic getWordPattern()
const assignWordRows = grid =>
  R.addIndex(R.map)((row, index) => {
    if (index % 2 === 0) {
      return validWordPatterns[getRandomArbitrary(0, validWordPatterns.length)];
    }

    return row;
  }, grid);

const initGrid = size => {
  const sizeRange = R.range(0, size);
  return sizeRange.map(() => sizeRange.map(() => 0).join(''));
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

  grid = transpose(
    transpose(grid)
      .map((column, columnIndex) => {
        // instead of always using a word pattern for the first column, we should assign word
        // patterns according to the middle row, so if the middle row has a 1 in the second column,
        // then that column should have the word pattern.
        if (columnIndex % 2 === 0) {
          const middleRowIndex = parseInt(grid.length / 2, 10);
          const middleRowTile = grid[middleRowIndex][columnIndex];
          const allowedPatterns = R.filter(pattern =>
            pattern[middleRowIndex] === middleRowTile, validWordPatterns);

          // do not change rows 1, 3, 5, 7, 8
          // use three state variables, to indicate tiles that don't have any assignment (null)
          return allowedPatterns[getRandomArbitrary(0, allowedPatterns.length)];
        }

        return column;
      })
  );

  return symmetricalize(grid);
}
