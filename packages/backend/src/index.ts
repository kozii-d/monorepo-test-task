import http from "http";
import path from "path";

import express, { json } from "express";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import cors from "cors";

import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/types";
import "dotenv/config";
import { authMiddleware } from "./middleware/authMiddleware";
import authRouter from "./routers/authRouter";

const port = Number(process.env.APPLICATION_PORT) || 4000;

const createServer = async () => {
  try {
    const app = express();

    const httpServer = http.createServer(app);

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    app.use(cors<cors.CorsRequest>());
    app.use(express.json());

    app.use("/static", express.static(path.resolve(__dirname, "..", "public")));

    app.use("/auth", authRouter);

    app.post("/api/graphql", authMiddleware, expressMiddleware(server));

    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "..", "public", "index.html"));
    });

    await new Promise<void>((resolve) => httpServer.listen({ port }, () => {
      // eslint-disable-next-line no-console
      console.log(`>>> Server start on port:${port} <<<`);
      resolve();
    }));
  } catch (e) {
    console.error(e);
  }
};

createServer();