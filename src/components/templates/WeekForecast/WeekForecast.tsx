import { useSelector } from "react-redux";

import { selectCurrentWeather } from "../../../features/position/positionSlice";
import { WeekForecastList } from "../../organisum/weekForecastList/weekForecastList";
import styles from "./WeekForecast.module.css";
import { WeekForecastData } from "../../../types/WeekForecastData";
import { Box, Flex } from "@chakra-ui/layout";
import { weekDates } from "../../../function/weekDate";

export const WeekForecast: React.VFC = () => {
  const currentWeather = useSelector(selectCurrentWeather);
  const weekForecasts: WeekForecastData[] = currentWeather?.daily
    ? currentWeather.daily
    : weekDates();

  return (
    <Box>
      <p className={styles.week_forecast}> 8日間の天気</p>
      <Flex flexWrap="wrap" justifyContent="center" >
        {weekForecasts?.map((weekForecast, index) => (
          <WeekForecastList
            key={index}
            num={index}
            tempMin={weekForecast.temp.min}
            tempMax={weekForecast.temp.max}
            src={weekForecast.weather[0].icon}
          />
        ))}
      </Flex>
    </Box>
  );
};
