import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts"

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number; 
  low: number;
  close: number;
  volume: number; 
  market_cap: number;
}
interface ChartProps {
    coinId: string;
}
function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
        fetchCoinHistory(coinId),
        {
            refetchInterval: 10000,
        }
    );
    return (
      <div>
        {isLoading ? (
          "Loading chart..."
        ) : (
          <ApexChart
            type="line"
            series={[
              {
                name: "hello",
                data: [1, 2, 3, 4, 5, 6],
              },
              {
                name: "Price",
                data: data?.map((price) => price.close) as number[],
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: {show: false},
              stroke: {
                curve: "smooth",
                width: 4,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                labels: {show: false},
                categories: data?.map((price) => price.time_close),
                type:"datetime",
              },
              fill: {
                type: "gradient",
                gradient: {
                  gradientToColors: ["blue"],
                  stops: [0, 100],
                },
              },
              colors: ["red"],
              tooltip: {
                y: {
                  formatter: (value) => `$ ${value.toFixed(3)}`,
                },
              },
            }}
          />
        )}
      </div>
    );

}

export default Chart;
