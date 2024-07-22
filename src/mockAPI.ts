import { createServer, Model, Factory } from "miragejs";
import PerformanceMetric from "./interfaces/PerformanceMetric";

const generatePerformanceMetricData = (
  length: number = 10000
): PerformanceMetric[] => {
  const data: PerformanceMetric[] = [];

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setFullYear(startDate.getFullYear() + 1);

  const interval = (endDate.getTime() - startDate.getTime()) / length;

  for (let index = 0; index < length; index++) {
    const timestamp = startDate.getTime() + index * interval;
    data.push({
      timestamp: timestamp,
      value: Number((Math.random() * 5).toFixed(2)),
    });
  }

  return data;
};

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,
    models: {
      performanceMetric: Model,
    },

    factories: {
      performanceMetric: Factory.extend({
        timestamp: Number,
        value: Number,
      }),
    },

    seeds(server) {
      const data = generatePerformanceMetricData();
      data.forEach((performanceMetric: PerformanceMetric) =>
        server.create("performanceMetric", performanceMetric)
      );
    },

    routes() {
      this.get("/api/data", (schema) => {
        return schema.all("performanceMetric");
      });
    },
  });
}
