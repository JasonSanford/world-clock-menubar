import React, { useEffect, useState } from 'react';
import ReactClock from 'react-clock';
import moment from 'moment';

function getDateWithOffset(offsetMinutes: number): Date {
  if (offsetMinutes !== 0) {
    return moment().add(offsetMinutes, 'minutes').toDate();
  }

  return (new Date());
}

function clockClassNameForDate(date: Date): string {
  const hour = date.getHours();

  if (hour >= 18 || hour < 6) {
    return 'clock-face-dark'
  }

  return 'clock-face-light';
}

function offsetMinutesToDiffDisplay(minuteDiff: number): string {
  const plusOrMinus = minuteDiff < 0 ? '-' : '+';
  const hours = Math.abs(Math.floor(minuteDiff / 60));
  const minutes = Math.abs(minuteDiff % 60);

  if (minutes > 0) {
    const paddedMinutes = minutes.toString().padStart(2, '0');
    return `${plusOrMinus}${hours}:${paddedMinutes}`;
  }

  const hrOrHrs = hours === 1 ? 'HR' : 'HRS';
  return `${plusOrMinus}${hours}${hrOrHrs}`;
}

interface Props {
  title: string;
  offsetMinutes: number;
  last: boolean;
}

const Clock = ({ title, offsetMinutes, last }: Props) => {
  const initialDate = getDateWithOffset(offsetMinutes);
  const initialClassName = clockClassNameForDate(initialDate);

  const [value, setValue] = useState<Date>(initialDate);
  const [className, setClassName] = useState<string>(initialClassName);

  useEffect(() => {
    const interval = setInterval(
      () => {
        const nextDate = getDateWithOffset(offsetMinutes);
        const nextClassName = clockClassNameForDate(nextDate);

        setValue(nextDate);
        setClassName(nextClassName);
      },
      1000
    );
 
    return () => {
      clearInterval(interval);
    }
  }, []);

  const titleStyle = {
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 1,
    marginTop: 5
  };

  const offsetStyle = {
    color: '#8e8d92',
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginTop: 5
  };

  const clockWrapperStyle = {
    marginRight: last ? 0 : 15,
  };

  return (
    <div style={clockWrapperStyle}>
      <ReactClock
        className={className}
        renderNumbers={true}
        renderMinuteMarks={false}
        value={value}
        size={125}
      />
      <div style={titleStyle}>
        {title}
      </div>
      <div style={offsetStyle}>
        {offsetMinutesToDiffDisplay(offsetMinutes)}
      </div>
    </div>
  )
}

export default Clock;
