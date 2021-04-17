import { useSelector } from "react-redux";
import { selectCurrentWeather } from "../features/position/positionSlice";

type TemperatureData = () => {
  name: string;
  気温: any;
}[]

export const useDataTemperature = () => {
  const currentWeather = useSelector(selectCurrentWeather);
  const date = new Date();
  const temperatureData:TemperatureData = () => {
    const array = [];
    for (let i = 0; i < 8; i++) {
      array.push({
        name: `${date.getHours() + i}時`,
        気温: currentWeather ? currentWeather.hourly[i].temp : 0,
      });
    }
    return array;
  };

  return { temperatureData };
};
