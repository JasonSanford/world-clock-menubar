import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { ILocation } from './types';

interface Props {
  onLocationAdded: (location: ILocation) => void;
}

const AddLocation = ({
  onLocationAdded
}: Props) => {
  const [title, setTitle] = useState<string>('');
  const [offsetMinutes, setOffsetMinutes] = useState<number>(null);

  return (
    <div>
      <input
        onChange={ (event) => setTitle(event.target.value) }
        placeholder="Title"
        value={title}
      />
      <input
        onChange={ (event) => setOffsetMinutes(parseInt(event.target.value, 10)) }
        placeholder="Offset Minutes"
        value={offsetMinutes}
      />
      <Button onClick={ () => { onLocationAdded({title, offsetMinutes}) } }>Go</Button>
    </div>
  )
}

export default AddLocation;
