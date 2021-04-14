import { useDispatch, useSelector } from "react-redux";
import {
  selectPosition,
  setWetherInformation,
} from "../features/position/positionSlice";

export const useGetWeatherInformation: any = () => {
  const currentPosition = useSelector(selectPosition);
  const dispatch = useDispatch();

  const getWeatherInformation = async () => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${currentPosition.latitude}&lon=${currentPosition.longitude}&appid=${process.env.REACT_APP_OPENWETHER_API_KEY}`
    )
      .then((res) => res.json())
      .then((val) => dispatch(setWetherInformation(val)));
  };

  return { getWeatherInformation };
};
