import { createServer, Model, Factory } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,
    models: {
      performanceMetric: Model,
    },

    factories: {
      performanceMetric: Factory.extend({
        timestamp: Date.now(),
        value: 0.5
      }),
    },

    seeds(server) {
      server.create("performanceMetric", {
        timestamp: Date.now(),
        value: 0.7
      });
    },

    routes() {
      this.get("/api/data", (schema) => {
        console.log(schema?.db.performanceMetrics);
        return schema.db.performanceMetrics;
      });
    },
  });
}
