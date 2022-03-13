import dotenv from "dotenv";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import { userService } from "./utils/user-service";
import { authentication } from "./middlewares/auth/authentication";
import "./config/mongodb-config";

dotenv.config();
const app = express();

async function startApolloServer() {
  const server = new ApolloServer({
    schema,
    playground: true,
    introspection: true,
    tracing: true,
    path: "/",
    context: ({ req }) => {
      // console.log("user from req :", req.user)
      const token = req.headers.authorization || "";
      return {
        user: userService.getUser(token.replace("Bearer ", "")) || null,
        headers: req.headers,
        accessToken: req.headers.authorization,
        phoneVerification: req.headers.phoneverification || "",
      };
    },
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
    cors: "no-cors",
    authentication,
  });

  app.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server listening on port ${process.env.PORT}`);
  });
}

startApolloServer().then(r => {
  // console.log(r);
}).catch((err) => {
  console.log(`🚀 Server Error: ${err.message}`);
})