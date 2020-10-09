import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Icon } from 'semantic-ui-react';

import { get } from './storage';
import { Styles, TimeFormat } from './types';

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
  index: number;
  title: string;
  offsetMinutes: number;
  onRemove: (index: number) => void;
}

const styles: Styles = {
  location: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #4c515b',
    padding: '15px 20px',
    WebkitFontSmoothing: 'antialiased',
    letterSpacing: 0.5,
    position: 'relative',
  },

  titleAndDiff: {
    flex: 3,
  },

  title: {
    fontSize: 20,
    color: '#ffffff',
  },

  offset: {
    fontSize: 14,
    opacity: 0.5,
    color: '#ffffff',
    marginTop: 5,
  },

  timeAndDay: {
    flex: 2,
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
  }
}

const Location = ({
  index, title, offsetMinutes, onRemove
}: Props) => {
  const initialDate = getDateWithOffset(offsetMinutes);

  const timeFormat: string = get('time_format', TimeFormat.Twelve);

  const [value, setValue] = useState<Date>(initialDate);
  const [hovered, setHovered] = useState<boolean>(false);

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

  const diplayTime = moment(value).format(timeFormat === TimeFormat.Twelve ? 'h:mm' : 'HH:mm');
  const displayAmPm = moment(value).format('A');
  const displayDay = {
    ['-1']: 'yesterday',
    ['0']: 'today',
    ['1']: 'tomorrow',
  }[moment(value).get('day') - moment().get('day')];

  const removeIconStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    color: '#ffffff',
    opacity: 0.5,
    cursor: 'pointer',
    display: hovered ? 'inline' : 'none',
  };

  return (
    <div
      onMouseEnter={ () => setHovered(true) }
      onMouseLeave={ () => setHovered(false) }
      style={styles.location}
    >
      <span onClick={ () => onRemove(index) } style={removeIconStyle}>
        <Icon name='remove' />
      </span>
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
            {diplayTime}
          </div>
          <div style={styles.ampm}>
            {displayAmPm}
          </div>
        </div>
        <div style={styles.day}>
          {displayDay}
        </div>
      </div>
    </div>
  )
}

export default Location;
