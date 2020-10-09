import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';

import { get, set } from './storage';
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
}

const defaultLocations: ILocation[] = [
  { title: 'Charlotte', offsetMinutes: 0 },
  { title: 'Dallas', offsetMinutes: -60 },
  { title: 'Bangalore', offsetMinutes: 570 },
]

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.Main);

  // const locations = [
  //   { title: 'Charlotte', offsetMinutes: 0 },
  //   { title: 'Dallas', offsetMinutes: -60 },
  //   { title: 'San Francisco', offsetMinutes: -180 },
  //   { title: 'Bangalore', offsetMinutes: 570 },
  //   { title: 'Charlotte', offsetMinutes: 0 },
  //   { title: 'Dallas', offsetMinutes: -60 },
  //   { title: 'San Francisco', offsetMinutes: -180 },
  //   { title: 'Bangalore', offsetMinutes: 570 },
  // ];

  const initialLocations: ILocation[] = get('locations', defaultLocations);

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
        onLocationAdded={ (location) => {
          const newLocations = [...locations];
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
      <Settings onDone={ () => { setAppState(AppState.Main) } } />
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
