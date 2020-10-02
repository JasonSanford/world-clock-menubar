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
    </div>
  )
}

export default Clock;
