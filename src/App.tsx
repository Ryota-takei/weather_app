import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { SearchArea } from "./components/templates/SearchArea/SearchArea";
import { Chart } from "./components/templates/Chart/Chart";
import { useDataTemperature } from "./hooks/useDataTemperature";
import { useDataHumidity } from "./hooks/useDataHumidity";
import { useGetCurrentPosition } from "./hooks/useGetCurrentPosition";
import { useGetWeatherInformation } from "./hooks/useGetWeatherInformation";
import { WeekForecast } from "./components/templates/WeekForecast/WeekForecast";
import { SwitchRadioButton } from "./components/molecules/SwitchRadioButton/SwitchRadioButton";

import { useSelector } from "react-redux";
import { selectPosition } from "../src/features/position/positionSlice";

export const App: React.FC = () => {
  const { getCurrentPosition } = useGetCurrentPosition();
  const [val, setVal] = useState(true);
  const { temperatureData } = useDataTemperature();
  const { humidityData } = useDataHumidity();
  const { getWeatherInformation } = useGetWeatherInformation();
  const currentPosition = useSelector(selectPosition);

  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {
    getWeatherInformation();
  }, [currentPosition]);

  return (
    <Box w="100%" maxW="850px" mx="auto" mt="12">
      <SearchArea />
      <Box display={{ base: "block", md: "flex" }}　w="95%" mx="auto">
        <Box w={{ base: "95%", md: "40%" }} mt="5" mx="auto">
          <WeekForecast />
        </Box>
        <Box w={{ base: "95%", md: "60%" }} mt="5" mx="auto">
          <SwitchRadioButton val={val} onClick={() => setVal(!val)} />
          {val ? (
            <Chart data={temperatureData()} value="気温" />
          ) : (
            <Chart data={humidityData()} value="湿度" />
          )}
        </Box>
      </Box>
    </Box>
  );
};
