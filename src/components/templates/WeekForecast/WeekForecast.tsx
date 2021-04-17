import { useSelector } from "react-redux";

import { selectCurrentWeather } from "../../../features/position/positionSlice";
import { WeekForecastList } from "../../organisum/weekForecastList/weekForecastList";
import { useWeekDate } from "../../../hooks/useWeekDate";
import styles from "./WeekForecast.module.css";
import { memo } from "react";

export const WeekForecast: React.VFC = memo(() => {
  const {weekDates} = useWeekDate();
  const currentWeather = useSelector(selectCurrentWeather);
  const weekForecasts: [] = currentWeather ? currentWeather.daily : weekDates();
  return (
    <div className={styles.container}>
      <p className={styles.week_forecast}> 8日間の天気</p>
      <div className={styles.weekForecasts_wrapper}>
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
    </div>
  );
});
