import { useState } from 'react';

import Scanner from './scanner';

import VConsole from 'vconsole';
import './App.css';

const vConsole = new VConsole();

function App() {
  const [start, setStart] = useState(false)
  return (
    <div className="App">
      <button onClick={() => setStart(true)}>开始扫描啊🤔</button>
      {start &&
        <Scanner
          onShowQrReaderToggle={() => setStart(false)}
        />
      }
    </div>
  );
}

export default App;
