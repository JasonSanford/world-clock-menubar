import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import ct from 'countries-and-timezones';

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
  { title: 'Dallas', timezoneName: 'US/Central', offsetMinutes: null },
  { title: 'Bangalore', timezoneName: 'Asia/Kolkata', offsetMinutes: null },
];

const getDefaultLocations = () => {
  const userTimezone = getUserTimezone();
  const defaultLocations: ILocation[] = [{ title: userTimezone.name, offsetMinutes: 0 }];
  defaultAlmostLocations.forEach(almostLocation => {
    const timezone = ct.getTimezone(almostLocation.timezoneName);
    almostLocation.offsetMinutes = timezone.dstOffset - userTimezone.dstOffset;
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

  if (appState === AppState.Add) {
    return (
      <AddLocation
        onCancel={ () => setAppState(AppState.Main) }
        onLocationAdded={ (title, timezone) => {
          const newLocations = [...locations];
          const offsetMinutes = timezone.dstOffset - getUserTimezone().dstOffset;
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
              onRemove={ (index) => handleRemoveLocation(index) }
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
