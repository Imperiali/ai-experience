import React, {useMemo, useReducer} from 'react';
// import MonteCarloTreeSearchNode from '../../IA/MonteCarloTreeSearchNode'

export const SuperBoardContext = React.createContext()

const checkAvailableMoves = (boards) => boards.map((board, boardIndex) => {
  if(board.winner !== null) return null
  return board.squares.map((square, squareIndex) => {
    if (square !== null) return null
    return [boardIndex, squareIndex]
  })
}).flat()

const InitialState = {
  boards: Array(9).fill({
    squares: Array(9).fill(null),
    winner: null
  }),
  availableMoves: Array(9).fill(Array(9).fill(null)),
  winner: null,
  stepNumber: 0,
  xIsNext: true,
  lastMove: null,
  endGame: false
}

const IAInitialState = {}

export const superBoardReducer = (state, action) => {
  // let IAPlayer = new MonteCarloTreeSearchNode(IAInitialState)

  switch (action.type) {
    case 'RESTART':
      // IAPlayer = new MonteCarloTreeSearchNode(IAInitialState)
      return InitialState
    // case 'IA_TURN':
    //   IAPlayer.best_action()
    //   return state
    case 'SET_SUPER_WINNER':
      return {
        ...state,
        winner: action.winner
      }
    case 'SET_DRAW':
      return {
        ...state,
        boards: state.boards.map((board, index) => {
          if (index !== action.boardId) return board
          return {
            ...board,
            winner: 'D'
          }
        }),
      }
    case 'SET_WINNER':
      return {
        ...state,
        boards: state.boards.map((board, index) => {
          if (index !== action.boardId) return board
          return {
            ...board,
            winner: state.xIsNext ? 'O' : 'X'
          }
        }),
      }
    case 'SET_AVAILABLE_MOVES':
      const endGame = state.winners?.filter(Boolean).length > 8
      const availableMoves = checkAvailableMoves(state.boards)

      return {
        ...state,
        availableMoves,
        endGame
      }
    case 'UPDATE_TURN':
      return {
        ...state,
        boards: state.boards.map((board, bindex) => {
          if (bindex !== action.boardId) return board
          return {
            ...board,
            squares: board.squares.map((square, sindex) => {
              if (sindex !== action.squareId) return square
              return state.xIsNext ? 'X' : 'O'
            })
          }
        }),
        lastMove: [action.boardId, action.squareId],
        stepNumber: state.stepNumber + 1,
        xIsNext: !state.xIsNext,
      }
    default:
      return state
  }
}
const SuperBoardProvider = ({ children}) => {
  const [state, dispatch] = useReducer(superBoardReducer, InitialState)
  const contextValue = useMemo(() => ({state, dispatch}), [state, dispatch])

  return <SuperBoardContext.Provider value={contextValue}>{children}</SuperBoardContext.Provider>
};

export default SuperBoardProvider;
