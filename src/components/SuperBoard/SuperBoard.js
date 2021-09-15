import React, {useEffect} from 'react';
import Board from "../Board";
import {useSuperBoard} from "../../hooks/superBoard";
import './superBoard.css'
import Winner from "../Winner";

const SuperBoard = () => {
  const { boards, winner, setSuperWinner } = useSuperBoard()

  useEffect(() => {
    setSuperWinner()
    // eslint-disable-next-line
  }, [boards])

  return (
    <div className="super-board-wrapper">
      { winner && <Winner winner={winner} superWinner/>}
      <div className="board-border-right">
        <Board hasBorder boardId={0}/>
        <Board hasBorder boardId={1}/>
        <Board boardId={2}/>
      </div>
      <div className="board-border-right">
        <Board hasBorder boardId={3}/>
        <Board hasBorder boardId={4}/>
        <Board boardId={5}/>
      </div>
      <div>
        <Board hasBorder boardId={6}/>
        <Board hasBorder boardId={7}/>
        <Board boardId={8}/>
      </div>
    </div>
  );
};

export default SuperBoard;
