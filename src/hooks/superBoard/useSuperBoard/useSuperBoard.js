import {useContext} from 'react';
import {SuperBoardContext} from "../superBoardProvider";
import {calculateWinner} from "../../../components/utils/calculateWinner";

const UseSuperBoard = (boardId) => {
  const { state: {boards, stepNumber, xIsNext, winner, endGame, availableMoves}, dispatch } = useContext(SuperBoardContext)

  const winners = boards.map(board => board.winner)

  const calculateSuperWinner = () => {
    return calculateWinner(winners)
  }

  return {
    boards,
    stepNumber,
    xIsNext,
    winner,
    endGame,
    board: boards[boardId],
    availableMoves,
    checkAvailableMoves: () => dispatch({ type: 'SET_AVAILABLE_MOVES'}),
    restart: () => dispatch({type: 'RESTART'}),
    updateTurn: (boardId, squareId) => dispatch({type: 'UPDATE_TURN', squareId, boardId}),
    setWinner: () => dispatch({type: 'SET_WINNER', boardId}),
    setDraw: () => dispatch({type: 'SET_DRAW', boardId}),
    setSuperWinner: () => dispatch({type: 'SET_SUPER_WINNER', winner: calculateSuperWinner()}),
  }
};

export default UseSuperBoard;
