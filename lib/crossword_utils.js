import R from 'ramda';

export const validWordPatterns = [
  '111101111111111',
  '111110111111111',
  '111111011111111',
  '111111101111111',
  '111111110111111',
  '111111111011111',
  '111111111101111',

  '011110111111111',
  '011111011111111',
  '011111101111111',
  '011111110111111',
  '011111111011111',
  '011111111101111',

  '111111111011110',
  '111111110111110',
  '111111101111110',
  '111111011111110',
  '111110111111110',
  '111101111111110',

  '011110111111110',
  '011111011111110',
  '011111101111110',
  '011111110111110',
  '011111111011110',

  '111110111101111',
  '111101111101111',
  '111101111011111',
  '111101111011110',
  '011110111101111',
];

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

const randomTile = () => Math.random() > 0.55 ? 1 : 0;

const getRandomArbitrary = (min, max) => parseInt(Math.random() * (max - min) + min, 10);

export const toString = pattern => R.flatten(pattern).join('');

const symmetricalize = grid => {
  const size = grid.length;
  const middleChar = grid[parseInt(size / 2, 10)][parseInt(size / 2, 10)];
  const gridString = toString(grid);
  const former = gridString.substring(0, parseInt(gridString.length / 2, 10));
  return R.map(
    toString,
    R.splitEvery(15, R.map(parseInt, `${former}${middleChar}${R.reverse(former)}`.split('')))
  );
};

const buildSymmetricalGrid = size => {
  const sizeRange = R.range(0, size);
  const buildRow = () => sizeRange.map(randomTile);
  const grid = sizeRange.map(index => {
    if (index % 2 === 0) {
      const randomIndex = getRandomArbitrary(0, validWordPatterns.length);
      return validWordPatterns[randomIndex];
    }

    return buildRow();
  });
  return symmetricalize(grid);
};

export function generateCrosswordPattern() {
  const size = 15;
  return buildSymmetricalGrid(size);
}
