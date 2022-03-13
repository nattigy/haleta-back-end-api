import dotenv from "dotenv";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import schema from "./schema";
import validateToken from "./middlewares/auth/validate-token";
import cookieParser from "cookie-parser";
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
        context: ({req}) => {
            // const token = req.headers.authorization || "";
            return {
                user: req.headers.user,
                headers: req.headers,
                phoneVerification: req.headers.phoneverification || "",
            };
        },
    });

    app.use(cookieParser())
    app.use(validateToken)

    await server.start();

    server.applyMiddleware({
        app,
        path: "/",
        cors: "no-cors",
    });

    app.listen({port: process.env.PORT}, () => {
        console.log(`🚀 Server listening on port ${process.env.PORT}`);
    });
}

startApolloServer().then(() => {
    console.log("Apollo serer started");
}).catch((err) => {
    console.log(`🚀 Server Error: ${err.message}`);
})