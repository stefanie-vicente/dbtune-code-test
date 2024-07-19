import { createServer, Model, Factory } from "miragejs";
import PerformanceMetric from "./interfaces/PerformanceMetric";

const generatePerformanceMetricData = (
  length: number = 10000
): PerformanceMetric[] => {
  const data: PerformanceMetric[] = [];
  for (let index = 0; index < length; index++) {
    data.push({
      timestamp: new Date().getTime() + index * length,
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
