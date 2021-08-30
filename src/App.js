import Game from "./components/Game";
import BoardProvider from "./hooks/board";


function App() {
  return (
    <BoardProvider>
      <Game />
    </BoardProvider>
  );
}

export default App;
