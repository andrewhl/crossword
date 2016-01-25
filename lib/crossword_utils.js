import R from 'ramda';

const forEachWithIndex = R.addIndex(R.forEach);

const randomCell = () => {
  return Math.random() > 0.55 ? 1 : 0;
};

const getCell = (position, grid) => {
  const row = grid[position.y];
  if (row === undefined) {
    return 0;
  }

  const cell = row[position.x];
  if (cell === undefined) {
    return 0;
  }

  return cell;
}

const setCell = (value, position, grid) => {
  const { x, y } = position;
  if (x < 0 || y < 0) {
    return grid;
  }

  if (y >= grid.length || x >= grid[y].length) {
    return grid;
  }

  let newGrid = R.clone(grid);
  newGrid[y][x] = value;
  return newGrid;
};

const getTopCell = (position, grid) => getCell({ x: position.x, y: position.y - 1 }, grid);
const getRightCell = (position, grid) => getCell({ x: position.x + 1, y: position.y }, grid);
const getBottomCell = (position, grid) => getCell({ x: position.x, y: position.y + 1 }, grid);
const getLeftCell = (position, grid) => getCell({ x: position.x - 1, y: position.y}, grid);

const hasTopCell = (position, grid) => getTopCell(position, grid) === 1;
const hasRightCell = (position, grid) => getRightCell(position, grid) === 1;
const hasBottomCell = (position, grid) => getBottomCell(position, grid) === 1;
const hasLeftCell = (position, grid) => getLeftCell(position, grid) === 1;

const setTopCell = (value, position, grid) => setCell(value, { x: position.x, y: position.y - 1 }, grid);
const setRightCell = (value, position, grid) => setCell(value, { x: position.x + 1, y: position.y }, grid);
const setBottomCell = (value, position, grid) => setCell(value, { x: position.x, y: position.y + 1 }, grid);
const setLeftCell = (value, position, grid) => setCell(value, { x: position.x - 1, y: position.y}, grid);

const isIsolatedCell = (position, grid) => {
  const cellValue = getCell(position, grid);
  if (cellValue === 0) {
    return false;
  }

  const noTopCell = !hasTopCell(position, grid);
  const noRightCell = !hasRightCell(position, grid);
  const noBottomCell = !hasBottomCell(position, grid);
  const noLeftCell = !hasLeftCell(position, grid);
  const isIsolated = noTopCell && noRightCell && noBottomCell && noLeftCell;
  return isIsolated;
};

const symmetricalize = grid => {
  const size = grid.length;
  const middleChar = grid[parseInt(size/2)][parseInt(size/2)];
  const gridString = toString(grid);
  const former = gridString.substring(0, parseInt(gridString.length / 2));
  return R.splitEvery(15, R.map(parseInt, `${former}${middleChar}${R.reverse(former)}`.split('')));
};

const buildSymmetricalGrid = size => {
  const sizeRange = R.range(0, size);
  const buildRow = r => sizeRange.map(randomCell);
  const grid = sizeRange.map(buildRow);
  return symmetricalize(grid);
};

export function generateCrosswordPattern() {
  const size = 15;
  const sizeRange = R.range(0, size)
  return buildSymmetricalGrid(size);

  // R.forEach(y => {
  //   if (y >= 8) {
  //     return;
  //   }
  //
  //   R.forEach(x => {
  //     if (x >= 8) {
  //       return;
  //     }
  //
  //     const cellPosition = { x, y };
  //     if (isIsolatedCell(cellPosition, newGrid)) {
  //       console.log('position', cellPosition);
  //       if (!hasTopCell(cellPosition, newGrid)) {
  //         newGrid = setTopCell(1, cellPosition, newGrid);
  //       }
  //
  //       if (!hasRightCell(cellPosition, newGrid)) {
  //         newGrid = setRightCell(1, cellPosition, newGrid);
  //       }
  //
  //       if (!hasBottomCell(cellPosition, newGrid)) {
  //         newGrid = setBottomCell(1, cellPosition, newGrid);
  //       }
  //
  //       if (!hasLeftCell(cellPosition, newGrid)) {
  //         newGrid = setLeftCell(1, cellPosition, newGrid);
  //       }
  //     }
  //   }, sizeRange);
  // }, sizeRange);
  //
  // return symmetricalize(newGrid);
}

export function toString(crosswordPattern) {
  return R.flatten(crosswordPattern).join('');
}
