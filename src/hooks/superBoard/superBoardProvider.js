import React, {useMemo, useReducer} from 'react';

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
  stepNumber: 0, //determina em qual jogada o jogo esta
  xIsNext: true, //determina quem é o próximo a jogar X ou O
}

export const superBoardReducer = (state, action) => {
  switch (action.type) {
    case 'RESTART':
      return InitialState
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
      return {
        ...state,
        availableMoves: checkAvailableMoves(state.boards)
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
