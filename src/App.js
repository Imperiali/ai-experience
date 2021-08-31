import Game from "./components/Game";
import SuperBoardProvider from "./hooks/superBoard";


function App() {
  return (
    <SuperBoardProvider>
      <Game />
    </SuperBoardProvider>
);
}

export default App;
