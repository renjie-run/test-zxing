import './App.css';
import Scanner from './scanner';

import { useState } from 'react';

function App() {
  const [start, setStart] = useState(false)
  return (
    <div className="App">
      <div style={{padding: 15, border: '1px red'}} onClick={() => setStart(true)}>开始扫描啊🤔</div>
      {start &&
        <Scanner
          onShowQrReaderToggle={() => setStart(false)}
        />
      }
    </div>
  );
}

export default App;
