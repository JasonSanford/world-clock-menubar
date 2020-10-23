import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import ct from 'countries-and-timezones';
import moment from 'moment-timezone';

import { get, set, unset } from './storage';
import { Styles, AppState, ILocation } from './types';
import Location from './Location';
import AddLocation from './AddLocation';
import Settings from './Settings';

const styles: Styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  locations: {
    height: 370,
    overflowY: 'auto',
  },

  bottomBar: {
    backgroundColor: '#e0e0e0',
    height: 30,
    paddingLeft: 3,
  },

  bottomBarButton: {
    padding: 6,
    marginTop: 3,
  },
};

const getUserTimezone = () => {
  let name = 'America/New_York';
  let timezone = ct.getTimezone(name);

  try {
    name = Intl.DateTimeFormat().resolvedOptions().timeZone;
    timezone = ct.getTimezone(name);
  } finally {
    return timezone;
  }
};

const defaultAlmostLocations = [
  { title: 'LA (click to edit)', timezoneName: 'US/Pacific', offsetMinutes: null },
  { title: 'Bangalore', timezoneName: 'Asia/Kolkata', offsetMinutes: null },
];

const getDefaultLocations = () => {
  const userTimezone = getUserTimezone();
  const isUserDST = moment().isDST();
  const userOffset = userTimezone[isUserDST ? 'dstOffset' : 'utcOffset'];
  const defaultLocations: ILocation[] = [{ title: userTimezone.name, offsetMinutes: 0 }];

  defaultAlmostLocations.forEach(almostLocation => {
    const timezone = ct.getTimezone(almostLocation.timezoneName);
    const isTimezoneDST = moment().tz(timezone.name).isDST()
    const timezoneOffset = timezone[isTimezoneDST ? 'dstOffset' : 'utcOffset']
    almostLocation.offsetMinutes = timezoneOffset - userOffset;
    defaultLocations.push(almostLocation);
  });

  return defaultLocations;
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.Main);

  const initialLocations: ILocation[] = get('locations', getDefaultLocations());

  const [locations, setLocations] = useState<ILocation[]>(initialLocations);

  const handleRemoveLocation = (index: number) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1);
    set('locations', newLocations);
    setLocations(newLocations);
  };

  const handleChangeTitle = (index: number, title: string) => {
    const newLocations = [...locations];
    newLocations[index].title = title;
    set('locations', newLocations);
    setLocations(newLocations);
  };

  if (appState === AppState.Add) {
    return (
      <AddLocation
        onCancel={ () => setAppState(AppState.Main) }
        onLocationAdded={ (title, timezone) => {
          const newLocations = [...locations];

          const userTimezone = getUserTimezone();
          const isUserDST = moment().isDST();
          const userOffset = userTimezone[isUserDST ? 'dstOffset' : 'utcOffset'];

          const isLocationDST = moment().tz(timezone.name).isDST();
          const locationOffset = timezone[isLocationDST ? 'dstOffset' : 'utcOffset'];

          const offsetMinutes = locationOffset - userOffset;
          const location = { title, timezone, offsetMinutes };
          newLocations.push(location);
          set('locations', newLocations);
          setLocations(newLocations);
          setAppState(AppState.Main)
        }}
      />
    )
  }

  if (appState === AppState.Settings) {
    return (
      <Settings
        onResetToDefault={ () => {
          setLocations(getDefaultLocations());
          unset('locations');
          unset('time_format');
          unset('theme');
          setAppState(AppState.Main);
        } }
        onDone={ () => { setAppState(AppState.Main) } }
      />
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.locations}>
        {
          locations.map((location, i) => (
            <Location
              key={i}
              index={i}
              onRemove={handleRemoveLocation}
              onChangeTitle={handleChangeTitle}
              {...location}
            />
          ))
        }
      </div>
      <div style={styles.bottomBar}>
        <Button
          icon
          style={styles.bottomBarButton}
          size='tiny'
          onClick={() => setAppState(AppState.Settings) }
        >
          <Icon name='setting' />
        </Button>
        <Button
          icon
          style={styles.bottomBarButton}
          size='tiny'
          onClick={() =>  setAppState(AppState.Add) }
        >
          <Icon name='add' />
        </Button>
      </div>
    </div>
  )
};

export default App;
