import React from 'react';
import Clock from './Clock';
import 'react-clock/dist/Clock.css';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', fontFamily: 'NotoSans, sans-serif' }}>
      <Clock title="Charlotte" offsetMinutes={0} />
      <Clock title="Dallas" offsetMinutes={-60} />
      <Clock title="Bangalore" offsetMinutes={570} />
    </div>
  )
};

export default App;
