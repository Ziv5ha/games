/// <reference types="react-scripts" />

declare namespace TentsNTrees {
  interface Game {
    tentsNumsX: number[];
    tentsNumsY: number[];
    map: Map;
    tentsNum: number;
  }
  type Map = string[][];
  type Row = string[];
  type Tile = [number, number];
  type TileStates = 'closed' | 'open' | 'tent';
}

declare global {
  interface Array<T> {
    Count(): T[];
  }
}
