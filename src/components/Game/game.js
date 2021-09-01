import React from 'react';
import './game.css';
import Title from '../../assets/title.png';
import Logo from '../../assets/logo.png';
import SuperBoard from "../SuperBoard";
import {useSuperBoard} from "../../hooks/superBoard";

const Game = () => {
  const { restart, winner, endGame } = useSuperBoard()

  return (
    <div className="game">
      <div>
        <img id="imgjogo" src={Logo} alt="Jogo da velha"/>
        <img width='100%' className='image-title' src={Title} alt="Jogo da velha"/>
      </div>
      <div>
        <SuperBoard/>
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
