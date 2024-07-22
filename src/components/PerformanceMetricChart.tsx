import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
} from "chart.js";
import { ChartOptions, ChartData } from "chart.js";
import { format } from "date-fns";
import PerformanceMetric from "../interfaces/PerformanceMetric";

ChartJS.register(
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
  const totalDataPoints = performanceMetricData.length;

  const formatLabelDate = (): string[] => {
    const labels = new Set<string>();
    performanceMetricData.forEach((item: PerformanceMetric) => {
      labels.add(format(item.timestamp, "LLL yy"));
    });
    return Array.from(labels);
  };

  const formatedTimestampLabel: string[] = formatLabelDate();
  const labelsLength = formatedTimestampLabel.length;

  const data: ChartData<"line"> = {
    labels: Array.from({ length: totalDataPoints }, (_, i) => i.toString()),
    datasets: [
      {
        label: "seconds",
        data: performanceMetricData.map((item) => item.value),
        fill: false,
        borderColor: "dodgerblue",
        pointRadius: 0,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          callback: (tickValue: string | number, index: number) => {
            const labelIndex = Math.floor(
              index / (totalDataPoints / (labelsLength - 1))
            );
            return index === totalDataPoints - 1
              ? formatedTimestampLabel[labelsLength - 1]
              : formatedTimestampLabel[labelIndex];
          },
          maxTicksLimit: labelsLength,
          font: {
            size: 16,
          },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        ticks: {
          stepSize: 1,
          font: {
            size: 16,
          },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "   Performance Metrics",
        align: "start",
        font: {
          size: 25,
        },
      },
      legend: {
        align: "start",
        labels: {
          boxWidth: 0,
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PerformanceMetricChart;
