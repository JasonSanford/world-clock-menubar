import React, { useEffect, useState } from 'react';
import { Form, Button, DropdownProps} from 'semantic-ui-react';

import { get, set } from './storage';
import { TimeFormat, Theme, Styles } from './types';

interface Props {
  onDone: () => void;
  onResetToDefault: () => void;
}

const styles: Styles = {
  container: {
    padding: 15,
  },

  formContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
  }
};

const Settings = ({
  onDone, onResetToDefault
}: Props) => {
  const timeOptions = [
    { key: TimeFormat.Twelve, text: TimeFormat.Twelve, value: TimeFormat.Twelve },
    { key: TimeFormat.TwentyFour, text: TimeFormat.TwentyFour, value: TimeFormat.TwentyFour },
  ];

  const themeOptions = [
    { key: Theme.Dark, text: Theme.Dark, value: Theme.Dark },
    { key: Theme.Light, text: Theme.Light, value: Theme.Light },
  ];

  const initialTimeFormat = get('time_format', TimeFormat.Twelve) as string;
  const initialTheme = get('theme', Theme.Dark) as string;

  const [timeFormat, setTimeFormat] = useState<string>(initialTimeFormat);
  const [theme, setTheme] = useState<string>(initialTheme);

  const onTimeFormatChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    const value = data.value as string;

    set('time_format', value);
    setTimeFormat(value as string);
  };

  const onThemeChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    const value = data.value as string;

    set('theme', value);
    setTheme(value as string);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <Form size='tiny'>
          <Form.Select
            fluid
            onChange={onTimeFormatChange}
            value={timeFormat}
            label='Time Format'
            options={timeOptions}
          />
          <Form.Select
            fluid
            onChange={onThemeChange}
            value={theme}
            label='Theme'
            options={themeOptions}
          />
          <Button
            primary
            onClick={onDone}
          >
            Done
          </Button>
          <Button
            size='small'
            color='red'
            onClick={onResetToDefault}
          >
            Reset Settings
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Settings;
