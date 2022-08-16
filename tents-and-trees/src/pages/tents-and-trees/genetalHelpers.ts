declare global {
  interface Array<T> {
    count(elem: T): number;
  }
}

if (!Array.prototype.count) {
  /* eslint-disable-next-line no-extend-native */
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

export const printGame = (game: TentsNTrees.Game): void => {
  const { tentsNumsX: tentNumsX, tentsNumsY: tentNumsY, map } = game;
  const printReadyMap = [] as (string | number)[][];
  printReadyMap.push(['  ', ...tentNumsX]);
  map.forEach((row, i) => printReadyMap.push([tentNumsY[i], ...row]));
  console.log(printReadyMap);
};
