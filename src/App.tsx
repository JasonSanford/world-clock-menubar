import React from 'react';
import Clock from './Clock';
import 'react-clock/dist/Clock.css';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Clock offsetMinutes={0} />
      <Clock offsetMinutes={570} />
    </div>
  )
};

export default App;
