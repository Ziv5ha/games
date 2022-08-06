const height = 6;
const width = 6;

declare namespace Game {
  type Map = string[][];
  type Row = string[];
  type Tents = [number, number][];
}

function generateBoard() {
  const map = generateEmptyMap(height, width);
  populateMap(map);
  console.log(map);
  const emptyMap = removeTents(map);
  console.log(emptyMap);
  return map;
}

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

const populateMap = (map: Game.Map): Game.Map => {
  const roundUp = Math.floor(Math.random() * 2) === 1;
  const tentsNum = roundUp
    ? Math.ceil(width * height * 0.2)
    : Math.floor(width * height * 0.2);
  let placedTents = 0;
  while (placedTents < tentsNum) {
    const y = Math.floor(Math.random() * height);
    const x = Math.floor(Math.random() * width);
    if (validTent(map, y, x)) {
      map[y][x] = '⛺';
      console.log('placed ⛺');
      placeTree(map, y, x);
      placedTents++;
    }
  }
  return map;
};

const validTent = (map: Game.Map, y: number, x: number): boolean => {
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
    console.log('placed 🌳');
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

generateBoard();
