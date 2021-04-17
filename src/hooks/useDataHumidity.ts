import { useSelector } from "react-redux";
import { selectCurrentWeather } from "../features/position/positionSlice";

type HumidityData = () => {
  name: string;
  湿度: any;
}[];

export const useDataHumidity = () => {
  const currentWeather = useSelector(selectCurrentWeather);
  const date = new Date();
  const humidityData:HumidityData = () => {
    let array = [];
    for (let i = 0; i < 8; i++) {
      array.push({
        name: `${date.getHours() + i}時`,
        湿度: currentWeather ? currentWeather.hourly[i].humidity : 0,
      });
    }
    return array;
  };

  return { humidityData };
};
