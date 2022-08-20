import React, { useState } from 'react';

export default function Tile({
  x,
  y,
  addTent,
  removeTent,
}: {
  x: number;
  y: number;
  addTent: (x: number, y: number) => void;
  removeTent: (x: number, y: number) => void;
}) {
  const [tileState, setTileState] = useState<TentsNTrees.TileStates>('closed');

  const conClickToggle = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    switch (tileState) {
      case 'closed':
        setTileState('open');
        break;
      case 'open':
        addTent(x, y);
        setTileState('tent');
        break;
      case 'tent':
        removeTent(x, y);
        setTileState('closed');
        break;
    }
  };
  /**
   * here can use switch statement instead of ifs (should be faster)
   * would also perhaps use buttons instead of spans
   */
  if (tileState === 'closed') return <span onClick={conClickToggle}>⬛</span>;
  if (tileState === 'open') return <span onClick={conClickToggle}>🟩</span>;
  return <span onClick={conClickToggle}>⛺</span>;
}
