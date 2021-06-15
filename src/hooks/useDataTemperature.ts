import { useSelector } from "react-redux";
import { selectCurrentWeather } from "../features/position/positionSlice";

export const useDataTemperature = () => {
  const currentWeather = useSelector(selectCurrentWeather);
  const date = new Date();

  const temperatureData = () => {
    const array = [];
    for (let i = 0; i < 8; i++) {
      array.push({
        name: `${date.getHours() + i}時`,
        気温: currentWeather?.hourly ? currentWeather?.hourly[i]?.temp : 0,
      });
    }
    return array;
  }; 

  return { temperatureData };
};
