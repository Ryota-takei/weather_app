import { useSelector } from "react-redux";
import { selectCurrentWeather } from "../features/position/positionSlice";

export const useDataHumidity = () => {
  const currentWeather = useSelector(selectCurrentWeather);
  const date = new Date();
  const data = [
    {
      name: `${date.getHours()}時`,
      湿度: currentWeather ? currentWeather.hourly[0].humidity : 0,
    },
    {
      name: `${date.getHours() + 1}時`,
      湿度: currentWeather ? currentWeather.hourly[1].humidity : 0,
    },
    {
      name: `${date.getHours() + 2}時`,
      湿度: currentWeather ? currentWeather.hourly[2].humidity : 0,
    },
    {
      name: `${date.getHours() + 3}時`,
      湿度: currentWeather ? currentWeather.hourly[3].humidity : 0,
    },
    {
      name: `${date.getHours() + 4}時`,
      湿度: currentWeather ? currentWeather.hourly[4].humidity : 0,
    },
    {
      name: `${date.getHours() + 5}時`,
      湿度: currentWeather ? currentWeather.hourly[5].humidity : 0,
    },
    {
      name: `${date.getHours() + 6}時`,
      湿度: currentWeather ? currentWeather.hourly[6].humidity : 0,
    },
    {
      name: `${date.getHours() + 7}時`,
      湿度: currentWeather ? currentWeather.hourly[7].humidity : 0,
    },
  ];
  return { data };
};
