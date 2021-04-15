import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Stack } from "@chakra-ui/react";
import { Map } from "./components/templates/Map";
import { CurrentWeather } from "./components/templates/CurrentWeather";
import { ChartTemperatureForecast } from "./components/templates/ChartTemperatureForecast";
import { Radio } from "@chakra-ui/react";
import { ChartHumidityForecast } from "./components/templates/ChartHumidityForecast";
import {
  selectCurrentWeather,
} from "./features/position/positionSlice";
import { WeekForecast } from "./components/templates/WeekForecast";
import { useGetCurrentPosition } from "./hooks/useGetCurrentPosition";


export const App: React.FC = () => {
  const currentWeather = useSelector(selectCurrentWeather);
  const [val, setVal] = useState("");
  const {getCurrentPosition} =  useGetCurrentPosition();
  console.log(currentWeather);

  useEffect(() => {
    getCurrentPosition();
  }, []);


  return (
    <div className="App">
      <Map />
      <CurrentWeather />

      <Stack spacing={10} direction="row">
        <Radio
          value="気温"
          isDisabled={val === "気温"}
          isChecked={val === "気温"}
          onChange={() => {
            setVal("気温");
          }}
        >
          気温
        </Radio>
        <Radio
          value="湿度"
          isDisabled={val === "湿度"}
          isChecked={val === "湿度"}
          onChange={() => {
            setVal("湿度");
          }}
        >
          湿度
        </Radio>
      </Stack>
      {val === "気温" ? (
        <ChartTemperatureForecast />
      ) : (
        <ChartHumidityForecast />
      )}
      <WeekForecast />
    </div>
  );
};
