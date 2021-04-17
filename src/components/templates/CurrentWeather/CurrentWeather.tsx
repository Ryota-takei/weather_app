import { useSelector } from "react-redux";
import styles from "./CurrentWeather.module.css";
import {
  selectCurrentWeather,
  selectInputAreaName,
} from "../../../features/position/positionSlice";

export const CurrentWeather: React.VFC = () => {
  const wetherInformation = useSelector(selectCurrentWeather);
  const inputAreaName = useSelector(selectInputAreaName);
  const date = new Date();
  const currentDate =
    `${date.getMonth() + 1}月` + `${date.getDate()}日` + `${date.getHours()}時`;

  return (
    <div className={styles.current_weather}>
      <p className={styles.current_time}>
        {currentDate}現在{" "}
        {wetherInformation
          ? wetherInformation.current.weather[0].description
          : ""}
      </p>
      <h2 className={styles.input_areaName}>
        {inputAreaName ? inputAreaName : "現在地"}
      </h2>
      <div className={styles.img_wrapper}>
        <img
          src={
            wetherInformation
              ? `http://openweathermap.org/img/wn/${wetherInformation.current.weather[0].icon}.png`
              : "http://openweathermap.org/img/wn/01d.png"
          }
          alt="天気イメージ"
        />
        <span>{wetherInformation ? wetherInformation.current.temp : 0}℃</span>
      </div>

      <div className={styles.temperature_wrapper}>
        <span>
          体感温度:{" "}
          {wetherInformation ? wetherInformation.current.feels_like : 0}
        </span>
        <span>
          最高気温:{" "}
          {wetherInformation ? wetherInformation.daily[0].temp.max : 0}
        </span>
        <span>
          最低気温:{" "}
          {wetherInformation ? wetherInformation.daily[0].temp.min : 0}
        </span>
      </div>
      <div className={styles.wind_wrapper}>
        <p>
          風：{wetherInformation ? wetherInformation.current.wind_speed : 0}m/s{" "}
        </p>
        <p>
          湿度：{wetherInformation ? wetherInformation.current.humidity : 0}％
        </p>
        <p>紫外線：{wetherInformation ? wetherInformation.current.uvi : 0}</p>
      </div>
    </div>
  );
};
