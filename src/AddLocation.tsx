import React, { useMemo, useState } from 'react';
import { Button, Flag, Form, Input, InputOnChangeData, List } from 'semantic-ui-react';
import ct from 'countries-and-timezones';

import { Styles, Timezone, Country } from './types';

interface TimezoneItemProps {
  timezone: Timezone,
  onChosen: (timezone: Timezone) => void;
}

const TimezoneItem: React.FC<TimezoneItemProps> = ({
  timezone, onChosen
}) => {
  return (
    <List.Item style={{ cursor: 'pointer' }} onClick={() => onChosen(timezone)}>
      <List.Icon name='clock' />
      {timezone.name}
    </List.Item>
  );
}

enum ScreenState {
  Search,
  Refine
}

interface Props {
  onLocationAdded: (title: string, timezone: Timezone) => void;
  onCancel: () => void;
}

interface State {
  searchValue: string;
  timezoneMatches: Array<Timezone>;
  countryMatches: Array<Country>;
  screenState: ScreenState;
  chosenTimezone: Timezone | null;
  refinedName: string | null;
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


const AddLocation: React.FC<Props>= ({
  onLocationAdded, onCancel
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [screenState, setScreenState] = useState<ScreenState>(ScreenState.Search);
  const [timezoneMatches, setTimezoneMatches] = useState<Array<Timezone>>([]);
  const [countryMatches, setCountryMatches] = useState<Array<Country>>([]);
  const [chosenTimezone, setChosenTimezone] = useState<Timezone | null>(null);
  const [refinedName, setRefinedName] = useState<string | null>(null);

  const countries = useMemo(() => Object.values(ct.getAllCountries()), []);
  const timezones = useMemo(() => Object.values(ct.getAllTimezones()), []);

  const timezonesByName = useMemo(() => {
    const tbn = {};

    for (const timezone of Object.values(ct.getAllTimezones())) {
      tbn[timezone.name] = timezone;
    }

    return tbn;
  }, []);

  const handleRefinedNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setRefinedName(data.value);
  };

  const renderRefine = () => {
    return (
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <Form size='tiny' style={{ marginBottom: 10 }}>
            <Form.Field>
              <label>Name this location</label>
              <Input
                autoFocus
                placeholder="Location name"
                onChange={handleRefinedNameChange}
                value={refinedName}
                onKeyUp={ (e) => {
                  const currentValue = e.target.value.trim();
                  if (e.key === 'Enter' && currentValue.length > 0) {
                    onLocationAdded(refinedName, chosenTimezone)
                  }
                } }
              />
            </Form.Field>
          </Form>
          <Button
            primary
            disabled={saveButtonDisabled()}
            style={{ marginTop: 5 }}
            onClick={() => {
              onLocationAdded(refinedName, chosenTimezone)
            } }
          >
            Save Location
          </Button>
          <Button
            style={{ marginTop: 5 }}
            onClick={() => {
              setRefinedName(null);
              setChosenTimezone(null);
              setScreenState(ScreenState.Search);
            } }
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    const currentSearchValue = data.value;
    const lowered = currentSearchValue.toLowerCase();
    const currentTimezoneMatches = [];
    const currentCountryMatches = [];

    if (currentSearchValue.length > 1) {
      timezones.forEach(timezone => {
        if (timezone.name.toLowerCase().includes(lowered)) {
          currentTimezoneMatches.push(timezone);
        }
      })

      countries.forEach(country => {
        if (country.name.toLowerCase().includes(lowered)) {
          currentCountryMatches.push(country);
        }
      });
    }

    setSearchValue(data.value);
    setTimezoneMatches(currentTimezoneMatches);
    setCountryMatches(currentCountryMatches);
  };

  const saveButtonDisabled = () => {
    if (refinedName && refinedName.trim().length > 0) {
      return false;
    }

    return true;
  }

  const handleTimezoneChosen = (timezone: Timezone) => {
    setChosenTimezone(timezone);
    setRefinedName(timezone.name);
    setScreenState(ScreenState.Refine);
  };

  const renderTimezones = () => {
    if (timezoneMatches.length > 0) {
      return (
        <List>
          <List.Item>
            <List.Content>
              <List.Header>
                Time Zones
              </List.Header>
            </List.Content>
          </List.Item>
          {
            timezoneMatches.map((timezone, i) => (
              <TimezoneItem
                key={i}
                onChosen={ () => { handleTimezoneChosen(timezone); } }
                timezone={timezone}
              />
            ))
          }
        </List>
      );
    }
  };

  const renderCountries = () => {
    if (countryMatches.length > 0) {
      return (
        <List>
          <List.Item>
            <List.Content>
              <List.Header>
                Countries
              </List.Header>
            </List.Content>
          </List.Item>
          {
            countryMatches.map((country, i) => (
              <List.Item key={i}>
                <List.Icon>
                  <Flag name={country.id.toLowerCase()} />
                </List.Icon>
                <List.Content>
                  <List.Header>
                    {country.name}
                  </List.Header>
                  <List.List>
                    {country.timezones.map((timezoneName, i) => (
                      <TimezoneItem
                        key={i}
                        onChosen={() => { handleTimezoneChosen(timezonesByName[timezoneName]); }}
                        timezone={timezonesByName[timezoneName]}
                      />
                    ))}
                  </List.List>
                </List.Content>
              </List.Item>
            ))
          }
        </List>
      );
    }
  };

  if (screenState === ScreenState.Refine) {
    return renderRefine();
  }

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <Form size='tiny' style={{ marginBottom: 10 }}>
          <Form.Input
            autoFocus
            placeholder="Search countries or time zone names"
            onChange={handleSearchChange}
            value={searchValue}
          />
        </Form>
        <div style={{ maxHeight: 250, overflowY: 'auto' }}>
          {renderTimezones()}
          {renderCountries()}
        </div>
        <Button style={{ marginTop: 5 }} onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}

export default AddLocation;
