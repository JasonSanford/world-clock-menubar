type Styles = {
  [key: string]: React.CSSProperties;
}

enum AppState {
  Main,
  Settings,
  Add,
}

interface ILocation {
  title: string;
  offsetMinutes: number;
}

enum TimeFormat {
  Twelve = '12 Hour',
  TwentyFour = '24 Hour',
}

enum Theme {
  Dark = 'Dark',
  Light = 'Light',
}

interface Timezone {
  name: string;
  utcOffset: number;
  utcOffsetStr: string;
  dstOffset: number;
  dstOffsetStr: string;
  aliasOf: string | null;
  country: string | null;
}

interface Country {
  id: string;
  name: string;
  timezones: ReadonlyArray<string>;
}

export { Styles, AppState, ILocation, TimeFormat, Theme, Timezone, Country };
