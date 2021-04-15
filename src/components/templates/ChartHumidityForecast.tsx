import {
  LineChart,
  Line,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDataHumidity } from "../../hooks/useDataHumidity";

export const ChartHumidityForecast = () => {
  const { data } = useDataHumidity();

  return (
    <div className="chart">
      <p>１時間ごとの予測</p>
      <ResponsiveContainer width="100%" height={400}>
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label value="時刻" offset={1} position="bottom" />
          </XAxis>
          <YAxis dataKey="湿度" type="number">
            <Label
              value="湿度"
              position="insideLeft"
              textAnchor="middle"
              angle={-90}
            />
          </YAxis>

          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="湿度"
            stroke="#48484a"
            stroke-width="3"
          />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
