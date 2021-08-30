import React from 'react';
import Square from '../Square';
import './board.css';

const Board = (props) => {
  const { winner, squares, onClick } = props;

  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}/>
    )
  }

  return (
    <div className="board-wrapper">
      { winner && <div className="winner">{winner}</div>}
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );

}

export default Board;
