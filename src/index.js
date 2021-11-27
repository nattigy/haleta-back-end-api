import dotenv from "dotenv";
import express from "express";
// import bodyParser from "body-parser";
import {ApolloServer} from "apollo-server-express";

import "./utils/db";
import schema from "./schema";

dotenv.config();

const app = express();

// app.use(bodyParser.json());

const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  tracing: true,
  path: "/",
});

server.applyMiddleware({
  app,
  path: "/",
  cors: 'no-cors'
});

app.listen({port: process.env.PORT}, () => {
  console.log(`🚀 Server listening on port ${process.env.PORT}`);
});
