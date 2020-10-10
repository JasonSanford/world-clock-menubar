import React, { useEffect, useState } from 'react';
import { Button, Flag, Form, InputOnChangeData, List } from 'semantic-ui-react';
import ct from 'countries-and-timezones';

import { ILocation, Styles, Timezone, Country } from './types';

interface TimezoneItemProps {
  timezone: Timezone,
  onChosen: (timezone: Timezone) => void;
}

const TimezoneItem: React.FC<TimezoneItemProps> = ({ timezone, onChosen }) => {
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
  onLocationAdded: (location: ILocation) => void;
  onCancel: () => void;
}

interface State {
  searchValue: string;
  timezoneMatches: Array<Timezone>;
  countryMatches: Array<Country>;
  screenState: ScreenState;
  chosenTimezone: Timezone | null;
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

export default class AddLocation extends React.Component<Props, State> {
  countries = []
  timezones = []
  timezonesByName = {}

  state: State = {
    searchValue: '',
    timezoneMatches: [],
    countryMatches: [],
    screenState: ScreenState.Search,
    chosenTimezone: null,
  }

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    const searchValue = data.value;
    const lowered = searchValue.toLowerCase();
    const timezoneMatches = [];
    const countryMatches = [];

    if (searchValue.length > 1) {
      this.timezones.forEach(timezone => {
        if (timezone.name.toLowerCase().includes(lowered)) {
          timezoneMatches.push(timezone);
        }
      })

      this.countries.forEach(country => {
        if (country.name.toLowerCase().includes(lowered)) {
          countryMatches.push(country);
        }
      });
    }

    this.setState({ searchValue: data.value, timezoneMatches, countryMatches });
  }

  componentDidMount() {
    for (const country of Object.values(ct.getAllCountries())) {
      this.countries.push(country);
    }

    for (const timezone of Object.values(ct.getAllTimezones())) {
      this.timezonesByName[timezone.name] = timezone;
      this.timezones.push(timezone);
    }
  }

  handleTimezoneChosen(timezone: Timezone) {
    this.setState({
      chosenTimezone: timezone,
      screenState: ScreenState.Refine
    });
  }

  renderCountries() {
    const { countryMatches } = this.state;

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
                        onChosen={() => { this.handleTimezoneChosen(this.timezonesByName[timezoneName]); }}
                        timezone={this.timezonesByName[timezoneName]}
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
  }

  renderTimezones() {
    const { timezoneMatches } = this.state;

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
                onChosen={ () => { this.handleTimezoneChosen(timezone); } }
                timezone={timezone}
              />
            ))
          }
        </List>
      );
    }
  }

  renderRefine() {
    return (
      <p>Hello</p>
    )
  }

  render() {
    const { searchValue, screenState } = this.state;

    if (screenState === ScreenState.Refine) {
      return this.renderRefine();
    }

    return (
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <Form size='tiny' style={{ marginBottom: 10 }}>
            <Form.Input
              placeholder="Search countries or time zone names"
              onChange={this.handleSearchChange}
              value={searchValue}
            />
          </Form>
          <div style={{ maxHeight: 250, overflowY: 'auto' }}>
            {this.renderTimezones()}
            {this.renderCountries()}
          </div>
          <Button style={{ marginTop: 5 }} onClick={this.props.onCancel}>Cancel</Button>
        </div>
        {/* <input
          onChange={ (event) => setTitle(event.target.value) }
          placeholder="Title"
          value={title}
        />
        <input
          onChange={ (event) => setOffsetMinutes(parseInt(event.target.value, 10)) }
          placeholder="Offset Minutes"
          value={offsetMinutes}
        /> */}
        {/* <Button onClick={ () => { onLocationAdded({title, offsetMinutes}) } }>Go</Button> */}
      </div>
    )
  }
}
