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

interface Props {
  offsetMinutes: number;
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

const Clock = ({ offsetMinutes }: Props) => {
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

  return (
    <div>
      <ReactClock
        className={className}
        renderNumbers={true}
        renderMinuteMarks={false}
        value={value}
      />
      <span style={{ color: '#8e8d92' }}>{offsetMinutesToDiffDisplay(offsetMinutes)}</span>
    </div>
  )
}

export default Clock;
