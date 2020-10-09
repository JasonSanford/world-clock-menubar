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

export { Styles, AppState, ILocation, TimeFormat };
