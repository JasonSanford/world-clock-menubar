import React from 'react';
import Clock from './Clock';
import 'react-clock/dist/Clock.css';

const App: React.FC = () => {
  const clocks = [
    { title: 'Charlotte', offsetMinutes: 0 },
    { title: 'Dallas', offsetMinutes: -60 },
    { title: 'Bangalore', offsetMinutes: 570 },
  ];
  return (
    <div style={{ display: 'flex', fontFamily: 'NotoSans, sans-serif', padding: 15 }}>
      {
        clocks.map((clock, i) => <Clock key={i} last={i === clocks.length - 1} {...clock} />)
      }
      {/* <Clock title="Charlotte" offsetMinutes={0} />
      <Clock title="Dallas" offsetMinutes={-60} />
      <Clock title="Bangalore" offsetMinutes={570} /> */}
    </div>
  )
};

export default App;
