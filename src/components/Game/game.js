import React from 'react';
import Board from '../Board';
import './game.css';
import Title from '../../assets/title.png';
import Logo from '../../assets/logo.png';
import {useBoard} from "../../hooks/board";

const Game = () => {
  const { restart, winner, endGame } = useBoard()

  return (
    <div className="game">
      <div>
        <img id="imgjogo" src={Logo} alt="Jogo da velha"/>
        <img src={Title} alt="Jogo da velha"/>
      </div>
      <div>
        <Board winner={winner}/>
        {
          winner ?
            <div>
              <div>
                Ganhador: {winner}
              </div>
              <button className="historyButton" onClick={() => restart()}>Vá para o início do jogo</button>
            </div> :
            endGame &&
            <div>
              <h1>
                Deu velha!
              </h1>
              <button className="historyButton" onClick={() => restart()}>Vá para o início do jogo</button>
            </div>
        }
      </div>
    </div>
  );

}

export default Game;
