import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactClock from 'react-clock';

const Clock = function(props) {
  const [value, setValue] = useState(new Date());
 
  const className = props.theme === 'day' ? 'clock-face-light' : 'clock-face-dark';

  useEffect(() => {
    const interval = setInterval(
      () => setValue(new Date()),
      1000
    );
 
    return () => {
      clearInterval(interval);
    }
  }, []);
 
  const reactClockProps = {
    renderNumbers: true,
    className,
    // hourHandLength: 60,
    // hourHandOppositeLength: 20,
    // hourHandWidth: 8,
    // hourMarksLength: 20,
    // hourMarksWidth: 8,
    // minuteHandLength: 90,
    // minuteHandOppositeLength: 20,
    // minuteHandWidth: 6,
    // minuteMarksLength: 6,
    // minuteMarksWidth: 3,
    // renderHourMarks: true,
    // renderMinuteHand: true,
    renderMinuteMarks: false,
    // renderSecondHand: true,
    // secondHandLength: 75,
    // secondHandOppositeLength: 25,
    // secondHandWidth: 3,
    // size: 250
  }

  return (
    <div>
      <ReactClock {...reactClockProps} value={value} />
    </div>
  )
}

Clock.propTypes = {
  theme: PropTypes.string.isRequired
}

export default Clock;
