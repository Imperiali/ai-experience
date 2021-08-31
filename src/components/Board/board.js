import React, {useEffect} from 'react';
import Square from '../Square';
import './board.css';
import classnames from "classnames";
import {useSuperBoard} from "../../hooks/superBoard";
import {calculateWinner} from "../utils/calculateWinner";
import Winner from "../Winner";

const Board = (props) => {
  const { hasBorder = false, boardId } = props
  const { board, setWinner, setDraw } = useSuperBoard(boardId)

  const winner = calculateWinner(board.squares)

  useEffect(() => {
    if (winner) {
      setWinner()
      return
    }
    if (board.length > 8){
      setDraw()
    }
  }, [winner])

  return (
    <div className="board-wrapper">
      { winner && <Winner winner={winner} />}
      <div className="board-row">
        <Square squareId={0} boardId={boardId}/>
        <Square squareId={1} boardId={boardId}/>
        <Square squareId={2} boardId={boardId}/>
      </div>
      <div className="board-row">
        <Square squareId={3} boardId={boardId}/>
        <Square squareId={4} boardId={boardId}/>
        <Square squareId={5} boardId={boardId}/>
      </div>
      <div className={classnames("board-row", {
        'board-border': hasBorder
      })}>
        <Square squareId={6} boardId={boardId}/>
        <Square squareId={7} boardId={boardId}/>
        <Square squareId={8} boardId={boardId}/>
      </div>
    </div>
  );

}

export default Board;
