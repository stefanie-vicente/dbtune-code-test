import { makeServer } from "./mockAPI";

let server: any;

if (process.env.NODE_ENV !== 'production') {
  server = makeServer({ environment: process.env.NODE_ENV });
}

export default server;