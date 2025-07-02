import { useState } from 'react';
import './App.css'
import StartMenu from './components/StartMenu';
import Game from './components/Game';


function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className='gamebox'>
      {started ? <Game /> : <StartMenu onPlay={() => setStarted(true)} />}
    </div>
  )
}

export default App
