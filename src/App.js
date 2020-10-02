import React from 'react';
import Clock from './Clock';
import 'react-clock/dist/Clock.css';

const App = () => {
  // return <p>Hey Broski!</p>;
  return (
    <div>
      <Clock theme="day" offsetMinutes={0} />
      <Clock theme="night" offsetMinutes={570} />
    </div>
  )
};

export default App;
