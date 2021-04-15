import { useDispatch, useSelector } from "react-redux";
import {
  selectPosition,
  setWetherInformation,
} from "../features/position/positionSlice";

export const useGetWeatherInformation: any = () => {
  const currentPosition = useSelector(selectPosition);
  const dispatch = useDispatch();
  const url = `ttps://api.openweathermap.org/data/2.5/onecall?lat=${currentPosition.latitude}&lon=${currentPosition.longitude}&units=metric&lang=ja&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;

  const getWeatherInformation = async () => {
    try {
      const res = await getInfo();
      const data = await res.json();
      await dispatch(setWetherInformation(data));
    } catch (err) {
      alert(
        "一時的にお天気情報が取得できません。時間を置いて再度お試しください"
      );
    }
  };

  const getInfo = async () => {
    try {
      const res = await fetch(url);
      return res;
    } catch (e) {
      throw e;
    }
  };

  return { getWeatherInformation };
};

