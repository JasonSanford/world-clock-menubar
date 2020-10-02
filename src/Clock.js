import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactClock from 'react-clock';
import moment from 'moment';

function getDateWithOffset(offsetMinutes) {
  if (offsetMinutes !== 0) {
    return moment().add(offsetMinutes, 'minutes').toDate();
  }

  return (new Date());
}

function Clock(props) {
  const [value, setValue] = useState(getDateWithOffset(props.offsetMinutes));
 
  const className = props.theme === 'day' ? 'clock-face-light' : 'clock-face-dark';

  useEffect(() => {
    const interval = setInterval(
      () => setValue(getDateWithOffset(props.offsetMinutes)),
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
      <p>Current time:</p>
      <ReactClock {...reactClockProps} value={value} />
    </div>
  )
}

Clock.propTypes = {
  theme: PropTypes.string.isRequired,
  offsetMinutes: PropTypes.number.isRequired,
}

export default Clock;
