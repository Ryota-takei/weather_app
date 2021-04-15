import { useSelector } from "react-redux";
import { selectCurrentWeather } from "../features/position/positionSlice";

export const useDataTemperature = () => {
  const currentWeather = useSelector(selectCurrentWeather);
  const date = new Date();
  const data = [
    {
      name: `${date.getHours()}時`,
      温度: currentWeather ? currentWeather.hourly[0].temp : 0,
    },
    {
      name: `${date.getHours() + 1}時`,
      温度: currentWeather ? currentWeather.hourly[1].temp : 0,
    },
    {
      name: `${date.getHours() + 2}時`,
      温度: currentWeather ? currentWeather.hourly[2].temp : 0,
    },
    {
      name: `${date.getHours() + 3}時`,
      温度: currentWeather ? currentWeather.hourly[3].temp : 0,
    },
    {
      name: `${date.getHours() + 4}時`,
      温度: currentWeather ? currentWeather.hourly[4].temp : 0,
    },
    {
      name: `${date.getHours() + 5}時`,
      温度: currentWeather ? currentWeather.hourly[5].temp : 0,
    },
    {
      name: `${date.getHours() + 6}時`,
      温度: currentWeather ? currentWeather.hourly[6].temp : 0,
    },
    {
      name: `${date.getHours() + 7}時`,
      温度: currentWeather ? currentWeather.hourly[7].temp : 0,
    },
  ];
  return { data };
};
