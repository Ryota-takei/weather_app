import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";

import { SearchArea } from "./components/templates/SearchArea/SearchArea";
import { CurrentWeather } from "./components/templates/CurrentWeather/CurrentWeather";
import { Chart } from "./components/templates/Chart/Chart";
import { useDataTemperature } from "./hooks/useDataTemperature";
import { useDataHumidity } from "./hooks/useDataHumidity";
import { WeekForecast } from "./components/templates/WeekForecast/WeekForecast";
import { useGetCurrentPosition } from "./hooks/useGetCurrentPosition";
import { SwitchRadioButton } from "./components/molecules/SwitchRadioButton/SwitchRadioButton";
import styles from "./App.module.css";

import {useSelector } from "react-redux";
import {selectCurrentWeather, selectPosition} from "../src/features/position/positionSlice"
import { useGetWeatherInformation } from "./hooks/useGetWeatherInformation";

export const App: React.FC = () => {
  const { getCurrentPosition } = useGetCurrentPosition();
  const [val, setVal] = useState(true);
  const { temperatureData } = useDataTemperature();
  const { humidityData } = useDataHumidity();
  const onClickChange = () => setVal(!val);
  const currentPosition = useSelector(selectPosition)
  const wetherInformation = useSelector(selectCurrentWeather)
  const {getWeatherInformation} = useGetWeatherInformation();

  console.log(wetherInformation)

  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {
    getWeatherInformation();
  },[currentPosition])
  

  return (
    <Container w="100%" maxW="850px" mx="auto" mt="12">
      <SearchArea />
      <div className={styles.chart_Wrapper}>
        <div>
          <CurrentWeather />
          <WeekForecast />
        </div>
        <div className={styles.chart}>
          <SwitchRadioButton val={val} onClick={onClickChange} />
          {val ? (
            <Chart data={temperatureData()} value="気温" />
          ) : (
            <Chart data={humidityData()} value="湿度" />
          )}
        </div>
      </div>
    </Container>
  );
};
