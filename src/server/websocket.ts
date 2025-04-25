import { WebSocketServer } from "ws";
import { Server } from "http";

export function initWebSocket(server: Server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("message", (message) => {
      // Broadcast message to all connected clients
      const messageData = JSON.parse(message.toString());
      wss.clients.forEach((client) => {
        if (client !== ws) {
          client.send(JSON.stringify(messageData));
        }
      });
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  return wss;
}
