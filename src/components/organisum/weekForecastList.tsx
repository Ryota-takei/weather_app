import React from "react";

interface Props {
  tempMin?: number | undefined;
  tempMax?: number | undefined;
  src?: string;
  num: number;
}

export const WeekForecastList: React.VFC<Props> = (props) => {
  const { tempMin = 0, tempMax = 0, src = "01d", num } = props;
  const date = new Date();
  date.setDate(date.getDate() + num);
  return (
    <div>
      {date.getMonth() + 1 + "月" + date.getDate() + "日"}
      <img src={`http://openweathermap.org/img/wn/${src}.png`} />
      <p>
        {Math.round(tempMax)} / {Math.round(tempMin)}℃
      </p>
    </div>
  );
};
