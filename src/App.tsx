import { useEffect, useState } from "react";
import "./App.css";
import PerformanceMetric from "./interfaces/PerformanceMetric";
import PerformanceMetricChart from "./components/PerformanceMetricChart";
import Button from "./components/Button";
import Card from "./components/Card";
import server from "./mirageServer";

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

  const onClickRefetchData = () => {
    if (server && server.refreshData) {
      server.refreshData();
      fetchData();
    }
  };

  const fetchData = () =>
    fetch("/api/data")
      .then((response) => response.json())
      .then(({ performanceMetrics }) => {
        filterDuplicatedMetricsValues(performanceMetrics);
      });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Button onClick={onClickRefetchData}>Refetch data</Button>
      <Card>
        <PerformanceMetricChart performanceMetricData={metrics} />
      </Card>
    </div>
  );
}

export default App;
