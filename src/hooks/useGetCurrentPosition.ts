import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, selectPosition, setPosition } from "../features/position/positionSlice";

export const useGetCurrentPosition = () => {
  const currentPosition = useSelector(selectPosition);
  const dispatch = useDispatch();
  const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;
  const failedUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentPosition.latitude}&lon=${currentPosition.longitude}&units=metric&lang=ja&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      fetch(url, { method: "post" })
        .then((res) => res.json())
        .then((val) => {
          if (val.accuracy < 10000) {
            const position = { lat: val.location.lat, lng: val.location.lng };
            const urlOpenWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${val.location.lat}&lon=${val.location.lng}&units=metric&lang=ja&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
            dispatch(setPosition(position));
            dispatch(fetchTasks(urlOpenWeather));
          }else {
            dispatch(fetchTasks(failedUrl));
          }
        })
        .catch((e) => {
          alert(
            "Map情報取得エラーが発生しました。通信環境のご確認もしくは時間を置いて改めてご利用ください"
          );
        });
    } else {
      alert(
        "ご使用の端末の位置情報がOFFもしくは一時的なエラーが発生しているため、エリアの記入をお願いします。"
      );
    }
  };
  return { getCurrentPosition };
};
