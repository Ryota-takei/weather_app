import { useSelector } from "react-redux";
import {
  selectCurrentWeather,
  selectInputAreaName,
} from "../../features/position/positionSlice";

export const CurrentWeather = () => {
  const wetherInformation = useSelector(selectCurrentWeather);
  const inputAreaName = useSelector(selectInputAreaName);
  const date = new Date();
  const currentDate =
    `${date.getMonth() + 1}月` + `${date.getDate()}日` + `${date.getHours()}時`;

    console.log(wetherInformation)

  return (
    <div className="current_weather">
      <p>
        {currentDate}現在{" "}
        {wetherInformation ? wetherInformation.current.weather[0].description : ""}
      </p>
      <p>{inputAreaName}</p>
      <div className="current_weather">
        <img
          src={
            wetherInformation
              ? `http://openweathermap.org/img/wn/${wetherInformation.current.weather[0].icon}.png`
              : "http://openweathermap.org/img/wn/01d.png"
          }
          alt="天気イメージ"
        />
        <p>{wetherInformation ? wetherInformation.current.temp : 0}℃</p>
      </div>
      <div className="temperature-wrapper">
        <p>
          体感温度: {wetherInformation ? wetherInformation.current.feels_like : 0}
        </p>
        <p>最高気温: {wetherInformation ? wetherInformation.daily[0].temp.max : 0}</p>
        <p>最低気温: {wetherInformation ? wetherInformation.daily[0].temp.min : 0}</p>
      </div>
      <div className="wind-wrapper">
        <p>風：{wetherInformation ? wetherInformation.current.wind_speed : 0}m/s </p>
        <p>湿度：{wetherInformation ? wetherInformation.current.humidity : 0}％</p>
        <p>紫外線：{wetherInformation ? wetherInformation.current.uvi : 0}</p>
      </div>
    </div>
  );
};
