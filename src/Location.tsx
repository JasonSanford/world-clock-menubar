import React, { useEffect, useState } from 'react';
import moment from 'moment';

function getDateWithOffset(offsetMinutes: number): Date {
  if (offsetMinutes !== 0) {
    return moment().add(offsetMinutes, 'minutes').toDate();
  }

  return (new Date());
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
}

interface Styles {
  [key: string]: React.CSSProperties;
}

const styles: Styles = {
  location: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #4c515b',
    padding: '15px 20px',
    WebkitFontSmoothing: 'antialiased',
    letterSpacing: 0.5,
    // justifyContent: 'space-between',
    // position: 'relative'
  },

  titleAndDiff: {
    flex: 3,
    // width: '65%',
  },

  title: {
    fontSize: 20,
    // letterSpacing: 1,
    color: '#ffffff',
    // fontWeight: 'lighter'
  },

  offset: {
    fontSize: 14,
    opacity: 0.5,
    color: '#ffffff',
    // letterSpacing: 0.5,
    marginTop: 5
  },

  timeAndDay: {
    flex: 2,
    // width: '35%',
    textAlign: 'right',
    paddingRight: 20,
  },

  time: {
    fontSize: 25,
    color: '#ffffff',
  },

  day: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.5,
    marginTop: 5,
    marginRight: 22,
  },

  ampm: {
    fontSize: 12,
    lineHeight: '10px',
    color: '#ffffff',
    opacity: 0.9,
    verticalAlign: 'text-top',
    // position: 'absolute',
    // left: '100%',
  }
}

const Location = ({ title, offsetMinutes }: Props) => {
  const initialDate = getDateWithOffset(offsetMinutes);

  const [value, setValue] = useState<Date>(initialDate);

  useEffect(() => {
    const interval = setInterval(
      () => {
        const nextDate = getDateWithOffset(offsetMinutes);

        setValue(nextDate);
      },
      1000
    );
 
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div style={styles.location}>
      <div style={styles.titleAndDiff}>
        <div style={styles.title}>
          {title}
        </div>
        <div style={styles.offset}>
          {offsetMinutesToDiffDisplay(offsetMinutes)}
        </div>
      </div>
      <div style={styles.timeAndDay}>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <div style={styles.time}>
            6:24
          </div>
          <div style={styles.ampm}>
            AM
          </div>
        </div>
        <div style={styles.day}>
          today
        </div>
      </div>
    </div>
  )
}

export default Location;
