import { useDispatch } from "react-redux";
import { useGetWeatherInformation } from "./useGetWeatherInformation";
import { setPosition } from "../features/position/positionSlice";

export const useGetCurrentPosition = () => {
  const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;
  const dispatch = useDispatch();
  const { getWeatherInformation } = useGetWeatherInformation();

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      fetch(url, { method: "post" })
        .then((res) => res.json())
        .then((val) => {
          const position = { lat: val.location.lat, lng: val.location.lng };
          dispatch(setPosition(position));
          getWeatherInformation();
        })
        .catch((e) => {
          alert("Map情報取得エラーが発生しました。通信環境のご確認もしくは時間を置いて改めてご利用ください");
        });
    } else {
      alert(
        "ご使用の端末の位置情報がOFFもしくは一時的なエラーが発生しているため、エリアの記入をお願いします。"
      );
    }
  };
  return { getCurrentPosition };
};
