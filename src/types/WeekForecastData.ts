export type WeekForecastData = {
  temp: {
    min: number;
    max: number;
  };
  weather: {
    icon: string;
  }[];
};
