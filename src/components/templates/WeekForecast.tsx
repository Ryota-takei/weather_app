import { useSelector } from "react-redux";
import { selectCurrentWeather } from "../../features/position/positionSlice";
import { WeekForecastList } from "../organisum/weekForecastList";
import { WeekDate } from "../../date/weekDate";

export const WeekForecast = () => {
  const currentWeather = useSelector(selectCurrentWeather);
  const weekForecasts: [] = currentWeather ? currentWeather.daily : WeekDate;
  return (
    <div>
      <p>7日間の天気</p>
      {weekForecasts.map((weekForecast: any, index) => (
        <WeekForecastList
          key={index}
          num={index}
          tempMin={weekForecast.temp.min}
          tempMax={weekForecast.temp.max}
          src={weekForecast.weather[0].icon}
        />
      ))}
    </div>
  );
};
