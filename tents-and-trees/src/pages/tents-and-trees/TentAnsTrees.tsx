import React, { useEffect, useRef, useState } from 'react';
import { generateGame } from './generateMap';
import { printGame } from './genetalHelpers';
import { testWin } from './testWin';
import Tile from './Tile';
import Tree from './Tree';

export default function TentAnsTrees() {
  const game = useRef(generateGame(5, 5));
  const [tentsPlacedNum, TentsPlacedNum] = useState(0);
  const [win, setWin] = useState(false);

  useEffect(() => {
    printGame(game.current);
    if (game.current.tentsNum === tentsPlacedNum) {
      if (testWin(game.current)) setWin(true);
    }
  }, [tentsPlacedNum]);

  const addTent = (x: number, y: number): void => {
    game.current.map[y][x] = '⛺';
    TentsPlacedNum((prev) => ++prev);
  };
  const removeTent = (x: number, y: number): void => {
    game.current.map[y][x] = '';
    TentsPlacedNum((prev) => --prev);
  };

  const boardElem = game.current.map.map((row, y) => (
    <div key={y}>
      {row.map((tile, x) =>
        tile === '🌳' ? (
          <Tree key={`${x}${y}`} />
        ) : (
          <Tile
            key={`${x}${y}`}
            x={x}
            y={y}
            addTent={addTent}
            removeTent={removeTent}
          />
        )
      )}
    </div>
  ));
  return (
    <div>
      {win ? (
        <div>
          <h1>You Won!</h1>
        </div>
      ) : (
        ''
      )}
      <div>{boardElem}</div>
    </div>
  );
}
