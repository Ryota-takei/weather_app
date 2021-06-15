import styles from "./Chart.module.css";
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
import { memo } from "react";

type TemperatureData = {
  name: string;
  気温?: number;
  湿度?: string;
}[];

type Props = {
  value: string;
  data: TemperatureData;
};

export const Chart: React.VFC<Props> = memo((props) => {
  const { data, value } = props;

  return (
    <div className={styles.chart}>
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
          <YAxis dataKey={value} type="number">
            <Label
              value={value}
              position="insideLeft"
              textAnchor="middle"
              angle={-90}
            />
          </YAxis>

          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey={value}
            stroke="#48484a"
            stroke-width="3"
          />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});
