import { countVerticly } from './genetalHelpers';

export function testWin(game: TentsNTrees.Game): boolean | TentsNTrees.Tile {
  if (!correctTentsInRowsAndColumns(game)) return false;
  const { map } = game;
  if (!tentsNumEqualsTreeNum(map)) return false;
  return checkTentLocations(map);
}

export const correctTentsInRowsAndColumns = (
  game: TentsNTrees.Game
): boolean => {
  const { tentsNumsX, tentsNumsY, map } = game;
  
  const correctTentsInRows = tentsNumsX.every((correctTentNum, i) => {
    const currentTentsInRow = map[i].count('⛺');
    return correctTentNum === currentTentsInRow;
  });
  /** here can already return if {@link correctTentsInRows} is false, avoid more loop */
  const correctTentsInColumns = tentsNumsY.every((correctTentNum, i) => {
    const currentTentsInRow = countVerticly(map, '⛺', i);
    return correctTentNum === currentTentsInRow;
  });
  return correctTentsInRows && correctTentsInColumns;
};

const tentsNumEqualsTreeNum = (map: TentsNTrees.Map): boolean => {
  let tentsNum = 0;
  let treesNum = 0;
  map.forEach((row) => {
    row.forEach((tile) => {
      if (tile === '⛺') tentsNum++;
      if (tile === '🌳') treesNum++;
    });
  });
  return treesNum === tentsNum;
};

export const checkTentLocations = (
  map: TentsNTrees.Map
): true | TentsNTrees.Tile => {
  for (let y = 0; y < map.length; y++) {
    const row = map[y];
    for (let x = 0; x < row.length; x++) {
      // check for no close tents
      if (!TentNotNextToOtherTent(map, y, x)) return [y, x];
      // Check every tree has a tent
      if (!TentNextToTree(map, y, x)) return [y, x];
    }
  }
  return true;
};

const TentNotNextToOtherTent = (
  map: TentsNTrees.Map,
  y: number,
  x: number
): boolean => {
  switch (y) {
    case 0:
      return (
        map[y][x - 1] !== '⛺' &&
        map[y][x + 1] !== '⛺' &&
        map[y + 1][x - 1] !== '⛺' &&
        map[y + 1][x] !== '⛺' &&
        map[y + 1][x + 1] !== '⛺'
      );
    case map.length - 1:
      return (
        map[y - 1][x - 1] !== '⛺' &&
        map[y - 1][x] !== '⛺' &&
        map[y - 1][x + 1] !== '⛺' &&
        map[y][x - 1] !== '⛺' &&
        map[y][x + 1] !== '⛺'
      );
    default:
      return (
        /**
         * just a suggestion ( for easier reading and writing) consider creating a class for the map that has a 
         * map.at(x,y).
         * more readable, and you could reuse in future for any game with a grid.
         * also could use negative index like in python ( if at all useful).
         * 
         */
        map[y - 1][x - 1] !== '⛺' &&
        map[y - 1][x] !== '⛺' &&
        map[y - 1][x + 1] !== '⛺' &&
        map[y][x - 1] !== '⛺' &&
        map[y][x + 1] !== '⛺' &&
        map[y + 1][x - 1] !== '⛺' &&
        map[y + 1][x] !== '⛺' &&
        map[y + 1][x + 1] !== '⛺'
      );
  }
};

const TentNextToTree = (
  map: TentsNTrees.Map,
  y: number,
  x: number
): boolean => {
  return (
    (map[y - 1] ? map[y - 1][x] !== '🌳' : false) ||
    map[y][x - 1] !== '🌳' ||
    map[y][x + 1] !== '🌳' ||
    (map[y + 1] ? map[y + 1][x] !== '🌳' : false)
  );
};
