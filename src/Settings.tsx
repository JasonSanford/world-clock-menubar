import React, { useEffect, useState } from 'react';
import { Form, Button, DropdownProps} from 'semantic-ui-react';

import { get, set } from './storage';
import { TimeFormat } from './types';

interface Props {
  onDone: () => void;
}

const Settings = ({
  onDone
}: Props) => {
  const timeOptions = [
    { key: TimeFormat.Twelve, text: TimeFormat.Twelve, value: TimeFormat.Twelve},
    { key: TimeFormat.TwentyFour, text: TimeFormat.TwentyFour, value: TimeFormat.TwentyFour},
  ];

  const initialTimeFormat = get('time_format', TimeFormat.Twelve);

  const [timeFormat, setTimeFormat] = useState<string>(initialTimeFormat);

  const onTimeFormatChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    const value = data.value as string;
    
    set('time_format', value);
    setTimeFormat(value as string);
  };

  return (
    <Form>
      <Form.Select
        fluid
        onChange={onTimeFormatChange}
        value={timeFormat}
        label='Time Format'
        options={timeOptions}
      />
      <Button onClick={onDone}>Done</Button>
    </Form>
  )
}

export default Settings;
