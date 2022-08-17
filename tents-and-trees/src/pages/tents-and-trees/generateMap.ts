import { countVerticly, printGame } from './genetalHelpers';

export function generateGame(height: number, width: number): TentsNTrees.Game {
  const map = generateEmptyMap(height, width);
  const tentsNum = calcTentsNum(height, width);
  populateMap(map, tentsNum);
  const tentsNumsX = generateTentsNumsInColumnsArr(map);
  const tentsNumsY = generateTentsNumsInRowsArr(map);
  // printGame({ map, tentsNumsX, tentsNumsY });
  const treesMap = removeTents(map);
  // printGame({ map: treesMap, tentsNumsX, tentsNumsY });
  return { map: treesMap, tentsNumsX, tentsNumsY, tentsNum };
}

// ---- generate map helpers ---- //

const generateEmptyMap = (height: number, width: number): TentsNTrees.Map => {
  const map = [] as TentsNTrees.Map;
  for (let h = 0; h < height; h++) {
    const row = [] as TentsNTrees.Row;
    for (let w = 0; w < width; w++) {
      row.push('  ');
    }
    map.push(row);
  }
  return map;
};

const calcTentsNum = (width: number, height: number): number => {
  const roundUp = Math.floor(Math.random() * 2) === 1;
  return roundUp
    ? Math.ceil(width * height * 0.2)
    : Math.floor(width * height * 0.2);
};

const populateMap = (
  map: TentsNTrees.Map,
  tentsNum: number
): TentsNTrees.Map => {
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

const validTentPlacement = (
  map: TentsNTrees.Map,
  y: number,
  x: number
): boolean => {
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
    case map.length - 1:
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

const placeTree = (map: TentsNTrees.Map, tentY: number, tentX: number) => {
  let treeY = tentY;
  let treeX = tentX;
  if (Math.floor(Math.random() * 2) === 0) {
    treeY = randomizeTreeTrasnlate(tentY, map.length);
  } else {
    treeX = randomizeTreeTrasnlate(tentX, map[0].length);
  }

  if (map[treeY][treeX] !== '🌳' && map[treeY][treeX] !== '⛺') {
    map[treeY][treeX] = '🌳';
  } else {
    placeTree(map, tentY, tentX);
  }
};

const randomizeTreeTrasnlate = (
  tentYorX: number,
  edgeOfMap: number
): number => {
  let rand = Math.floor(Math.random() * 3);
  switch (tentYorX) {
    case 0:
      return rand - 1 === 1 ? tentYorX + 1 : tentYorX;
    case edgeOfMap - 1:
      return rand - 1 === 1 ? tentYorX - 1 : tentYorX;
    default:
      return rand === 2 ? tentYorX + 1 : rand === 1 ? tentYorX : tentYorX - 1;
  }
};

const removeTents = (map: TentsNTrees.Map): TentsNTrees.Map => {
  return map.map((row) => row.map((tile) => (tile === '⛺' ? '  ' : tile)));
};

const generateTentsNumsInRowsArr = (map: TentsNTrees.Map): number[] => {
  const tentsNumsY = [] as number[];
  map.forEach((row) => {
    tentsNumsY.push(row.count('⛺'));
  });
  return tentsNumsY;
};

const generateTentsNumsInColumnsArr = (map: TentsNTrees.Map): number[] => {
  const tentsNumsY = [] as number[];
  for (let i = 0; i < map[0].length; i++) {
    tentsNumsY.push(countVerticly(map, '⛺', i));
  }
  return tentsNumsY;
};
