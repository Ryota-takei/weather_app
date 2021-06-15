import { useDispatch, useSelector } from "react-redux";
import {
  selectPosition,
  setWetherInformation,
} from "../features/position/positionSlice";

export const useGetWeatherInformation: any = () => {
  const currentPosition = useSelector(selectPosition);
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentPosition.latitude}&lon=${currentPosition.longitude}&units=metric&lang=ja&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
  const dispatch = useDispatch();

  const getWeatherInformation = async () => {
    try {
      const res = await fetch(url);
      if (res) {
        const data = await res.json();
        dispatch(setWetherInformation(data));
      } else {
        throw new Error("エラーが発生")
      }
    } catch (err) {
      alert("エラーが発生しました");
    }
  };

  return { getWeatherInformation };
};
