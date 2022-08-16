const height = 10;
const width = 5;

declare namespace Game {
  interface Game {
    tentsNumsX: number[];
    tentsNumsY: number[];
    map: Map;
  }
  type Map = string[][];
  type Row = string[];
  type Tile = [number, number];
}

function generateBoard(height: number, width: number): Game.Game {
  const map = generateEmptyMap(height, width);
  const tentsNum = calcTentsNum(height, width);
  populateMap(map, tentsNum);
  const tentsNumsX = generateTentsNumsInColumnsArr(map);
  const tentsNumsY = generateTentsNumsInRowsArr(map);
  const treesMap = removeTents(map);
  printGame({ map: treesMap, tentsNumsX, tentsNumsY });
  return { map: treesMap, tentsNumsX, tentsNumsY };
}

const calcTentsNum = (width: number, height: number): number => {
  const roundUp = Math.floor(Math.random() * 2) === 1;
  return roundUp
    ? Math.ceil(width * height * 0.2)
    : Math.floor(width * height * 0.2);
};

const generateEmptyMap = (height: number, width: number): Game.Map => {
  const map = [] as Game.Map;
  for (let h = 0; h < height; h++) {
    const row = [] as Game.Row;
    for (let w = 0; w < width; w++) {
      row.push('  ');
    }
    map.push(row);
  }
  return map;
};

const populateMap = (map: Game.Map, tentsNum: number): Game.Map => {
  let placedTents = 0;
  while (placedTents < tentsNum) {
    const y = Math.floor(Math.random() * map.length);
    const x = Math.floor(Math.random() * map[0].length);
    if (validTentPlacement(map, y, x)) {
      map[y][x] = '⛺';
      placeTree(map, y, x);
      placedTents++;
    }
  }
  return map;
};

const validTentPlacement = (map: Game.Map, y: number, x: number): boolean => {
  switch (y) {
    case 0:
      return (
        map[y][x - 1] !== '⛺' &&
        map[y][x] !== '⛺' &&
        map[y][x] !== '🌳' &&
        map[y][x + 1] !== '⛺' &&
        map[y + 1][x - 1] !== '⛺' &&
        map[y + 1][x] !== '⛺' &&
        map[y + 1][x + 1] !== '⛺'
      );
    case height - 1:
      return (
        map[y - 1][x - 1] !== '⛺' &&
        map[y - 1][x] !== '⛺' &&
        map[y - 1][x + 1] !== '⛺' &&
        map[y][x - 1] !== '⛺' &&
        map[y][x] !== '⛺' &&
        map[y][x] !== '🌳' &&
        map[y][x + 1] !== '⛺'
      );
    default:
      return (
        map[y - 1][x - 1] !== '⛺' &&
        map[y - 1][x] !== '⛺' &&
        map[y - 1][x + 1] !== '⛺' &&
        map[y][x - 1] !== '⛺' &&
        map[y][x] !== '⛺' &&
        map[y][x] !== '🌳' &&
        map[y][x + 1] !== '⛺' &&
        map[y + 1][x - 1] !== '⛺' &&
        map[y + 1][x] !== '⛺' &&
        map[y + 1][x + 1] !== '⛺'
      );
  }
};

const placeTree = (map: Game.Map, tentY: number, tentX: number) => {
  let treeY = tentY;
  let treeX = tentX;
  if (Math.floor(Math.random() * 2) === 0) {
    treeY = randomizeTreeTrasnlate(tentY, height);
  } else {
    treeX = randomizeTreeTrasnlate(tentX, width);
  }

  if (map[treeY][treeX] !== '🌳' && map[treeY][treeX] !== '⛺') {
    map[treeY][treeX] = '🌳';
  } else {
    placeTree(map, tentY, tentX);
  }
};

const randomizeTreeTrasnlate = (tentY: number, limit: number): number => {
  let rand = Math.floor(Math.random() * 3);
  switch (tentY) {
    case 0:
      rand = Math.floor(Math.random() * 2);
      return rand === 1 ? tentY + 1 : tentY;

    case limit - 1:
      rand = Math.floor(Math.random() * 2);
      return rand === 1 ? tentY - 1 : tentY;
    default:
      return rand === 2 ? tentY + 1 : rand === 1 ? tentY : tentY - 1;
  }
};

const removeTents = (map: Game.Map): Game.Map => {
  return map.map((row) => row.map((tile) => (tile === '⛺' ? '  ' : tile)));
};

const generateTentsNumsInRowsArr = (map: Game.Map): number[] => {
  const tentsNumsY = [] as number[];
  map.forEach((row) => {
    tentsNumsY.push(row.count('⛺'));
  });
  return tentsNumsY;
};

const generateTentsNumsInColumnsArr = (map: Game.Map): number[] => {
  const tentsNumsY = [] as number[];
  for (let i = 0; i < map[0].length; i++) {
    tentsNumsY.push(countVerticly(map, '⛺', i));
  }
  return tentsNumsY;
};

declare global {
  interface Array<T> {
    count(elem: T): number;
  }
}

if (!Array.prototype.count) {
  Array.prototype.count = function <T>(query: T): number {
    let counter = 0;
    this.forEach((elem) => {
      if (elem === query) counter++;
    });
    return counter;
  };
}

export const countVerticly = <T>(
  grid: T[][],
  query: T,
  columnNum: number
): number => {
  let counter = 0;
  grid.forEach((row) => {
    if (row[columnNum] === query) counter++;
  });
  return counter;
};

const printGame = (game: Game.Game): void => {
  const { tentsNumsX: tentNumsX, tentsNumsY: tentNumsY, map } = game;
  const printReadyMap = [] as (string | number)[][];
  printReadyMap.push([' ', ...tentNumsX.map((num) => ` ${num}`)]);
  map.forEach((row, i) => printReadyMap.push([`${tentNumsY[i]}`, ...row]));
  console.log(printReadyMap);
};

//////////////
// Test win //
//////////////
function generateCompletedBoard(height: number, width: number): Game.Game {
  const map = generateEmptyMap(height, width);
  const tentsNum = calcTentsNum(height, width);
  populateMap(map, tentsNum);
  const tentsNumsX = generateTentsNumsInColumnsArr(map);
  const tentsNumsY = generateTentsNumsInRowsArr(map);
  return { map, tentsNumsX, tentsNumsY };
}

function testWin(game: Game.Game): boolean | Game.Tile {
  printGame(game);
  const { map } = game;
  if (!tentsNumEqualsTreeNum(map)) return false;
  if (!correctTentsInRowsAndColumns(game)) return false;
  const didaYouWin = checkTentLocations(map);
  console.log(didaYouWin ? 'you won!' : 'try again...');
  return didaYouWin;
}

const correctTentsInRowsAndColumns = (game: Game.Game): boolean => {
  const { tentsNumsX, tentsNumsY, map } = game;
  const correctTentsInRows = tentsNumsY.every((correctTentNum, i) => {
    const currentTentsInRow = map[i].count('⛺');
    return correctTentNum === currentTentsInRow;
  });
  const correctTentsInColumns = tentsNumsX.every((correctTentNum, i) => {
    const currentTentsInRow = countVerticly(map, '⛺', i);
    return correctTentNum === currentTentsInRow;
  });
  return correctTentsInRows && correctTentsInColumns;
};

const tentsNumEqualsTreeNum = (map: Game.Map): boolean => {
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

const checkTentLocations = (map: Game.Map): true | Game.Tile => {
  for (let y = 0; y < map.length; y++) {
    const row = map[y];
    for (let x = 0; x < row.length; x++) {
      if (map[y][x] === '⛺') {
        // check for no close tents
        if (!TentNotNextToOtherTent(map, y, x)) return [y, x];
        // Check every tree has a tent
        if (!TentNextToTree(map, y, x)) return [y, x];
      }
    }
  }
  return true;
};

const TentNotNextToOtherTent = (
  map: Game.Map,
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
    case height - 1:
      return (
        map[y - 1][x - 1] !== '⛺' &&
        map[y - 1][x] !== '⛺' &&
        map[y - 1][x + 1] !== '⛺' &&
        map[y][x - 1] !== '⛺' &&
        map[y][x + 1] !== '⛺'
      );
    default:
      return (
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

const TentNextToTree = (map: Game.Map, y: number, x: number): boolean => {
  return (
    (map[y - 1] ? map[y - 1][x] !== '🌳' : false) ||
    map[y][x - 1] !== '🌳' ||
    map[y][x + 1] !== '🌳' ||
    (map[y + 1] ? map[y + 1][x] !== '🌳' : false)
  );
};

generateBoard(height, width);
testWin(generateCompletedBoard(height, width));
