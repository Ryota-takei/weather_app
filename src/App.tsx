import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  selectPosition,
  setPosition,
  selectCurrentWeather,
} from "./features/position/positionSlice";
import { SearchArea } from "./components/templates/SearchArea";
import { useGetWeatherInformation } from "../src/hooks/useGetWeatherInformation";

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const currentPosition = useSelector(selectPosition);
  const currentWeather = useSelector(selectCurrentWeather);
  const {getWeatherInformation }= useGetWeatherInformation();

  const date = new Date();
  const currentDate =
    `${date.getMonth() + 1}月` + `${date.getDate()}日` + `${date.getHours()}時`;

  const data = [
    {
      name: `${date.getHours()}時`,
      temperature: 0,
    },
    {
      name: `${date.getHours() + 1}時`,
      temperature: 0,
    },
    {
      name: `${date.getHours() + 2}時`,
      temperature: 0,
    },
    {
      name: `${date.getHours() + 3}時`,
      temperature: 0,
    },
    {
      name: `${date.getHours() + 4}時`,
      temperature: 0,
    },
    {
      name: `${date.getHours() + 5}時`,
      temperature: 10,
    },
    {
      name: `${date.getHours() + 6}時`,
      temperature: 0,
    },
    {
      name: `${date.getHours() + 7}時`,
      temperature: 0,
    },
  ];

  // 現在地の取得
  useEffect(() => {
    const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;

    if (navigator.geolocation) {
      fetch(url, { method: "post" })
        .then((res) => res.json())
        .then((val) => {
          const position = { lat: val.location.lat, lng: val.location.lng };
          dispatch(setPosition(position));
          getWeatherInformation();
        })
        .catch((e) => {
          alert(e.message);
        });
    } else {
      alert(
        "ご使用の端末の位置情報がOFFもしくは一時的なエラーが発生しているため、エリアの記入をお願いします。"
      );
    }
  }, []);
  
  console.log(currentWeather);

  return (
    <div className="App">
      <SearchArea />
      <div className="current_weather">
        <p>{currentDate}</p>
        <div className="temperature-wrapper">
          <p>体感温度: 0</p>
          <p>最高気温: 0</p>
          <p>最低気温: 0</p>
        </div>
        <div className="wind-wrapper">
          <p>風：０</p>
          <p>気圧：０</p>
          <p>湿度：０</p>
        </div>
      </div>

      <div className="chart">
        <p>１時間ごとの予測</p>

        <LineChart
          width={500}
          height={350}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 25,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="name">
            <Label value="時刻" offset={1} position="bottom" />
          </XAxis>
          <YAxis
            label={{
              value: "気温",
              angle: -90,
              position: "insideLeft",
              textAnchor: "middle",
            }}
          />
          <Legend verticalAlign="top" height={36} />
          <Line type="monotone" dataKey="temperature" stroke="#000000" />
          <Tooltip />
          <Legend />
        </LineChart>
      </div>
    </div>
  );
};
