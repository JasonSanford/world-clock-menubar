import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Icon, Input } from 'semantic-ui-react';

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

const styles: Styles = {
  location: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #4c515b',
    // padding: '15px 20px',
    padding: '10px 20px 15px 20px',
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
    cursor: 'pointer',
    padding: 5,
    marginLeft: -5,
    borderRadius: 4,
  },

  titleHovered: {
    backgroundColor: '#4B525F',
  },

  offset: {
    fontSize: 14,
    opacity: 0.5,
    color: '#ffffff',
  },

  timeAndDay: {
    flex: 2,
    textAlign: 'right',
  },

  time: {
    fontSize: 25,
    color: '#ffffff',
  },

  ampm: {
    fontSize: 12,
    lineHeight: '10px',
    color: '#ffffff',
    opacity: 0.9,
    verticalAlign: 'text-top',
  }
}

interface Props {
  index: number;
  title: string;
  offsetMinutes: number;
  onRemove: (index: number) => void;
  onChangeTitle: (index: number, name: string) => void;
}

const Location = ({
  index, title, offsetMinutes, onRemove, onChangeTitle
}: Props) => {
  const initialDate = getDateWithOffset(offsetMinutes);

  const timeFormat: string = get('time_format', TimeFormat.Twelve);

  const [value, setValue] = useState<Date>(initialDate);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const [titleHovered, setTitleHovered] = useState<boolean>(false);

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

  const renderTitleOrInput = () => (
    editMode
      ? (
        <Input
          autoFocus
          size='mini'
          defaultValue={title}
          onBlur={ () => setEditMode(false) }
          onKeyUp={ (e) => {
            const currentValue = e.target.value.trim();
            if (e.key === 'Enter' && currentValue.length > 0) {
              onChangeTitle(index, currentValue);
              setEditMode(false);
            }
          } }
        />
      ) : (
        <div
          onMouseEnter={ () => setTitleHovered(true) }
          onMouseLeave={ () => setTitleHovered(false) }
          onClick={ () => setEditMode(true) }
          style={
            Object.assign(
              {},
              styles.title,
              titleHovered ? styles.titleHovered : {}
            )
          }
        >
          {title}
        </div>
      )
  );

  const removeIconStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    color: '#ffffff',
    opacity: 0.5,
    cursor: 'pointer',
    display: hovered ? 'inline' : 'none',
  };

  const dayStyle: React.CSSProperties = {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.5,
    marginTop: 5,
    marginRight: timeFormat === TimeFormat.Twelve ? 22 : 0,
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
        {renderTitleOrInput()}
        <div style={styles.offset}>
          {offsetMinutesToDiffDisplay(offsetMinutes)}
        </div>
      </div>
      <div style={styles.timeAndDay}>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <div style={styles.time}>
            {diplayTime}
          </div>
          {
            timeFormat === TimeFormat.Twelve &&
            (
              <div style={styles.ampm}>
                {displayAmPm}
              </div>
            )
          }
        </div>
        <div style={dayStyle}>
          {displayDay}
        </div>
      </div>
    </div>
  )
}

export default Location;
