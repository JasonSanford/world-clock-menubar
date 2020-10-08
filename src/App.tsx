import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';

import { Styles, AppState } from './types';
import Location from './Location';

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

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.Main);

  const locations = [
    { title: 'Charlotte', offsetMinutes: 0 },
    { title: 'Dallas', offsetMinutes: -60 },
    { title: 'San Francisco', offsetMinutes: -180 },
    { title: 'Bangalore', offsetMinutes: 570 },
    { title: 'Charlotte', offsetMinutes: 0 },
    { title: 'Dallas', offsetMinutes: -60 },
    { title: 'San Francisco', offsetMinutes: -180 },
    { title: 'Bangalore', offsetMinutes: 570 },
  ];

  if (appState === AppState.Add) {
    return (
      <div>
        Time to add a place
        <Button
          icon
          size='tiny'
          onClick={() => setAppState(AppState.Main) }
        >
          Done
        </Button>
      </div>
    )
  }

  if (appState === AppState.Settings) {
    return (
      <div>
        Time to do settings
        <Button
          icon
          size='tiny'
          onClick={() => setAppState(AppState.Main) }
        >
          Done
        </Button>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.locations}>
        {
          locations.map((location, i) => <Location key={i} {...location} />)
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
