import { useState } from 'react';
import './App.css'
import StartMenu from './components/StartMenu';
import Game from './components/Game';


function App() {
  const [started, setStarted] = useState(false);

  const [gameKey, setGameKey] = useState<number>(0);
  const resetGame = () => setGameKey(prev => prev + 1);

  return (
    <div className='gamebox'>
      {started ? <Game  key={gameKey} onReplay={resetGame}/> : <StartMenu onPlay={() => setStarted(true)} />}
    </div>
  )
}

export default App
