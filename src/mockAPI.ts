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

const seedData = (server: any) => {
  const data = generatePerformanceMetricData();
  data.forEach((performanceMetric) =>
    server.create("performanceMetric", performanceMetric)
  );
}

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,

    models: {
      performanceMetric: Model.extend<PerformanceMetric>({
        timestamp: 0,
        value: 0
      }),
    },

    factories: {
      performanceMetric: Factory.extend({
        timestamp: Number,
        value: Number,
      }),
    },

    seeds(server) {
      seedData(server);
    },

    routes() {
      this.namespace = "api";
      this.get("/data", (schema) => {
        return schema.all("performanceMetric");
      });
    },
  });


  server.refreshData = function() {
    server.db.emptyData();
    seedData(server);
  };

  return server;
}