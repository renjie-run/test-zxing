import './App.css';
import Scanner from './scanner';

import { useState } from 'react';

function App() {
  const [start, setStart] = useState(false)
  return (
    <div className="App">
      <button onClick={() => setStart(true)}>开始扫描</button>
      {start &&
        <Scanner
          onShowQrReaderToggle={() => setStart(false)}
        />
      }
    </div>
  );
}

export default App;
