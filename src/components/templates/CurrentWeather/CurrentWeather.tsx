import { useSelector } from "react-redux";
import styles from "./CurrentWeather.module.css";
import {
  selectCurrentWeather,
  selectInputAreaName,
} from "../../../features/position/positionSlice";

export const CurrentWeather: React.VFC = () => {
  const weatherInformation = useSelector(selectCurrentWeather);
  const inputAreaName = useSelector(selectInputAreaName);
  const date = new Date();
  const currentDate =
    `${date.getMonth() + 1}月` + `${date.getDate()}日` + `${date.getHours()}時`;

  return (
    <div className={styles.current_weather}>
      <p className={styles.current_time}>
        {currentDate}現在{" "}
        {weatherInformation
          ? weatherInformation.current?.weather[0].description
          : ""}
      </p>
      <h2 className={styles.input_areaName}>
        {inputAreaName ? inputAreaName : "現在地"}
      </h2>
      <div className={styles.img_wrapper}>
        <img
          src={
            weatherInformation?.current?.weather
              ? `http://openweathermap.org/img/wn/${weatherInformation.current.weather[0].icon}.png`
              : "http://openweathermap.org/img/wn/01d.png"
          }
          alt="天気イメージ"
        />
        <span>{weatherInformation?.current?.temp ?? 0}℃</span>
      </div>

      <div className={styles.temperature_wrapper}>
        <span>体感温度: {weatherInformation?.current?.feels_like ?? 0}</span>
        <span>
          最高気温:{" "}
          {weatherInformation?.daily
            ? weatherInformation?.daily[0].temp?.max
            : 0}
        </span>
        <span>
          最低気温:{" "}
          {weatherInformation?.daily
            ? weatherInformation?.daily[0]?.temp?.min
            : 0}
        </span>
      </div>
      <div className={styles.wind_wrapper}>
        <p>
          風：{weatherInformation?.current?.wind_speed ?? 0}
          m/s{" "}
        </p>
        <p>湿度：{weatherInformation?.current?.humidity ?? 0}％</p>
        <p>紫外線：{weatherInformation?.current?.uvi ?? 0}</p>
      </div>
    </div>
  );
};
