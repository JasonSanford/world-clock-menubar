import React, { useEffect, useState } from 'react';
import { Button, Flag, Form, InputOnChangeData, List } from 'semantic-ui-react';
import ct from 'countries-and-timezones';

import { ILocation, Styles, Timezone, Country } from './types';

interface Props {
  onLocationAdded: (location: ILocation) => void;
  onCancel: () => void;
}

interface State {
  searchValue: string;
  timezoneMatches: Array<Timezone>;
  countryMatches: Array<Country>;
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

  state: State = {
    searchValue: '',
    timezoneMatches: [],
    countryMatches: [],
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
      this.timezones.push(timezone);
    }
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
            countryMatches.map(country => (
              <List.Item>
                <List.Icon>
                  <Flag name={country.id.toLowerCase()} />
                </List.Icon>
                <List.Content>
                  <List.Header>
                    {country.name}
                  </List.Header>
                  <List.List>
                    {country.timezones.map(timezone => (
                      <List.Item>
                        <List.Icon name='clock' />
                        {timezone}
                      </List.Item>
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
            timezoneMatches.map(timezone => (
              <List.Item>
                <List.Icon name='clock' />
                {timezone.name}
              </List.Item>
            ))
          }
        </List>
      );
    }
  }

  render() {
    const { searchValue } = this.state;

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
