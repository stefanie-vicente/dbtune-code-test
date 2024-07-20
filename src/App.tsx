import { useEffect, useState } from "react";
import PerformanceMetric from "./interfaces/PerformanceMetric";
import PerformanceMetricChart from "./components/PerformanceMetricChart";

function App() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);

  const filterDuplicatedMetricsValues = (data: PerformanceMetric[]) => {
    const values = new Set<number>();
    const filtered: PerformanceMetric[] = [];
    for (let index = 0; index < data.length; index++) {
      if (values.size >= 501) break;
      if (!values.has(data[index].value)) {
        values.add(data[index].value);
        filtered.push(data[index]);
      }
    }
    setMetrics(filtered);
  };

  const fetchData = () =>
    fetch("/api/data")
      .then((response) => response.json())
      .then(({ performanceMetrics }) =>
        filterDuplicatedMetricsValues(performanceMetrics)
      );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <PerformanceMetricChart performanceMetricData={metrics} />
    </>
  );
}

export default App;
