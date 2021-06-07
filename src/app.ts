import cors from "cors";
import router from "./router";
import websocket from "websocket";
import { createServer } from "http";
import express, { Request, Response, NextFunction } from "express";

interface utf8DataInft {
  type?: string;
  utf8Data: {
    msg?: string;
  };
}

const normalizePort = (val: any) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const app = express();
const server = createServer(app);
const PORT = normalizePort(process.env.PORT || "8080");

// const allowlist = ["http://localhost:3000", "http://example2.com"];

// CORS
app.use(cors());
// console.log(server);
// Router
app.use(router);

server.listen(PORT, () => {
  // console.log("Added!");
  console.log(`http://localhost:${PORT}`);
});

const createUserId = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0 * 1000).toString();
  return s4() + s4() + "-" + s4();
};

// All user data
const datas = [
  {
    id: "as345678cvc",
    status: false,
    phone: "+39 04050543040",
    name: "Abu Sayem Md Habibullah",
    targa: "aa555bb",
  },
];

// Websocket server
const clients: any = {};
const webSocketServer = websocket.server;

const wsServer = new webSocketServer({
  httpServer: server,
});

wsServer.on("request", (request) => {
  const userId = createUserId();
  console.log(
    `${new Date().toLocaleString()} - got a new connection request from: ${
      request.origin
    }.`
  );

  const connection = request.accept("echo-protocol", request.origin);

  clients[userId] = connection;
  connection.on("message", (message) => {
    if (message.type === "utf8") {
      // console.log("Recive data: ", message.utf8Data);
      for (let key in clients) {
        clients[key].sendUTF(message.utf8Data);
        // console.log("Send message to: ", clients[key]);
      }
    }
  });
});
