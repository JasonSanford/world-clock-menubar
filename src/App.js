import React from 'react';
import Clock from './Clock';
import 'react-clock/dist/Clock.css';

const App = () => {
  // return <p>Hey Broski!</p>;
  return (
    <div>
      <Clock theme="day" />
      <Clock theme="night" />
    </div>
  )
};

export default App;
