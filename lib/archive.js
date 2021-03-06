
// import R from 'ramda';
// const crosswordData = [
//   {
//     position: [0, 0],
//     word: 'anapest',
//     direction: 'across',
//   },
//   {
//     position: [8, 0],
//     word: 'drachma',
//     direction: 'across',
//   },
//   {
//     position: [0, 0],
//     word: 'arch',
//     direction: 'down',
//   }
// ];
//
// const buildLetterObject = (startX, startY, dir, letter, idx) => {
//   return {
//     letter,
//     x: dir === 'across' ? startX + idx : startX,
//     y: dir === 'down' ? startY + idx : startY,
//   };
// };
//
// const initialize2dArray = (size) => {
//   let crossword = [];
//   for (var i = 0; i < size; i++) {
//     crossword.push([]);
//     for (var j = 0; j < size; j++) {
//       crossword[i].push('');
//     }
//   }
//   return crossword;
// }
//
// const getLetterObjsFromWordList = wordList => R.flatten(R.map(getLetterObjs, wordList));
//
// const getDataFromLetterObjs = letterObjs => {
//   let crossword = initialize2dArray(15);
//   R.forEach((letterObj) => {
//     crossword[letterObj.y][letterObj.x] = letterObj.letter;
//   }, letterObjs);
//   return crossword;
// };
//
// const process = R.compose(getDataFromLetterObjs, getLetterObjsFromWordList);
//
// const getLetterObjs = ({ word, position, direction }) => {
//     const startX = position[0];
//     const startY = position[1];
//     const curriedBuildLetterObject = R.curry(buildLetterObject)(startX, startY, direction);
//
//     const mapIndexed = R.addIndex(R.map);
//     return mapIndexed(curriedBuildLetterObject, word.split(''));
// };
//
// const splitCrossWordPattern = pattern => pattern.map(p => p.split('').map(t => parseInt(t, 10)));
// const processedCrossword = splitCrossWordPattern(generateCrosswordPattern())
// .map(row => row.map(c => c === 1 ? c : ''));
