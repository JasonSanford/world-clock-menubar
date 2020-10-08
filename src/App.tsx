import { ipcRenderer } from 'electron';
import React, { useState } from 'react';
import { Button, Icon, Header, Image, Modal, List } from 'semantic-ui-react';

import Location from './Location';

declare global {
  interface Window { ipcRenderer: typeof ipcRenderer; }
}

const App: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);

  const locations = [
    { title: 'Charlotte', offsetMinutes: 0 },
    { title: 'Dallas', offsetMinutes: -60 },
    { title: 'San Francisco', offsetMinutes: -180 },
    { title: 'Bangalore', offsetMinutes: 570 },
  ];

  return (
    <div>
      {
        locations.map((location, i) => <Location key={i} {...location} />)
      }
    </div>
      // <div>
      //   <Button
      //     style={{padding: 2}}
      //     icon
      //     size='tiny'
      //     onClick={() => {
      //       window.ipcRenderer.send('show-settings');
      //       setShowSettings(true);
      //     }}
      //   >
      //     <Icon name='setting' />
      //   </Button>
      // </div>
  )
};

export default App;
