import { createServer, Model } from "miragejs";
import { PerformanceMetric } from "./interfaces/PerformanceMetric";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,
    models: {
      performanceMetric: Model.extend<Partial<PerformanceMetric>>({}),
    },
    seeds(server) {
      server.create("performanceMetric", {});
    },
    routes() {
        this.get("/api/data", (schema, request) => {
        console.log(schema, request)
        return {}
      });
    },
  });
}
