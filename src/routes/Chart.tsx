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
        fetchCoinHistory(coinId)
    );
    return <div>{isLoading ? "Loading chart..." : <ApexChart
        
        type="line"
        series={[
            {
                name: "hello",
                data: [1, 2, 3, 4, 5, 6],
            },
            {
                name: "sales",
                data: data?.map(price => price.close) as number[],
            },

        ]}
        options={{
            theme: {
                mode: "dark",
            },
            chart: {
                height: 500,
                width: 500,
                toolbar: {
                    show: false,
                }
            },
            stroke: {
                curve: "smooth",
                width: 4,
            }

        }}
    />
    }</div>

}

export default Chart;
