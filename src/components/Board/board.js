import React from 'react';
import Square from '../Square';
import './board.css';
import {useBoard} from "../../hooks/board";

const Board = () => {
  // const { boardId } = props;
  const {winner} = useBoard()

  return (
    <div className="board-wrapper">
      { winner && <div className="winner">{winner}</div>}
      <div className="board-row">
        <Square squareId={0}/>
        <Square squareId={1}/>
        <Square squareId={2}/>
      </div>
      <div className="board-row">
        <Square squareId={3}/>
        <Square squareId={4}/>
        <Square squareId={5}/>
      </div>
      <div className="board-row">
        <Square squareId={6}/>
        <Square squareId={7}/>
        <Square squareId={8}/>
      </div>
    </div>
  );

}

export default Board;
