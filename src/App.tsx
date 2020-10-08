import { ipcRenderer } from 'electron';
import React, { useState } from 'react';
import { Button, Icon, Header, Image, Modal, List } from 'semantic-ui-react';

import Clock from './Clock';

declare global {
  interface Window { ipcRenderer: typeof ipcRenderer; }
}

const App: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);

  const clocks = [
    { title: 'Charlotte', offsetMinutes: 0 },
    { title: 'Dallas', offsetMinutes: -60 },
    { title: 'San Francisco', offsetMinutes: -180 },
    { title: 'Bangalore', offsetMinutes: 570 },
  ];

  return (
    <div style={{display: 'relative'}}>
      <div style={{ display: 'flex', fontFamily: 'NotoSans, sans-serif', padding: 15 }}>
        {
          clocks.map((clock, i) => <Clock key={i} last={i === clocks.length - 1} {...clock} />)
        }
      </div>
      <Button
        style={{position: 'absolute', top: 0, left: 0, margin: 5, padding: 2}}
        icon
        size='tiny'
        onClick={() => {
          window.ipcRenderer.send('show-settings');
          setShowSettings(true);
        }}
      >
        <Icon name='setting' />
      </Button>
      <Modal open={showSettings}>
        <Modal.Content>
          <List celled style={{ maxHeight: 200, overflowY: 'auto'}}>
            {
              clocks.map((clock, i) => (
                <List.Item key={i}>
                  <List.Content>
                    <List.Header>Snickerdoodle</List.Header>
                    An excellent companion
                  </List.Content>
                </List.Item>
              ))
            }
          </List>
        </Modal.Content>
        <Modal.Actions>
          <Button
            size='tiny'
            color='black' onClick={() => {
              window.ipcRenderer.send('hide-settings');
              setShowSettings(false);
            }}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
};

export default App;
