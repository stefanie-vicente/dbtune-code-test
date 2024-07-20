import {
  Chart,
  CategoryScale,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import PerformanceMetric from "../interfaces/PerformanceMetric";

Chart.register(
  CategoryScale,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title
);

interface PerformanceMetricChartProps {
  performanceMetricData: PerformanceMetric[];
}

const PerformanceMetricChart: React.FC<PerformanceMetricChartProps> = ({
  performanceMetricData,
}) => {
  const data = {
    labels: performanceMetricData.map((item) =>
      new Date(item.timestamp).toDateString()
    ),
    datasets: [
      {
        label: "seconds",
        data: performanceMetricData.map((item) => item.value),
        borderColor: "blue",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Performance Metrics",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PerformanceMetricChart;
