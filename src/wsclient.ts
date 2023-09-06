import { WebSocket } from "ws";
import { RequestObject } from "./objects.js";
import { JSONRPCClient } from "./client.js";

export class RPCWebsocketClient extends JSONRPCClient {
  url: string;
  headers: object;
  private readonly ws: WebSocket;
  private readonly messageResolvers: Map<any, any>;

  constructor(url: string, headers = {}) {
    super();
    this.url = url;
    this.headers = headers;
    this.headers["Content-Type"] = "application/json";
    this.ws = new WebSocket(url, { headers });
    this.messageResolvers = new Map();
    this.ws.on("message", (data) => {
      const response = JSON.parse(data.toString());
      const requestId = response.id;
      const resolver = this.messageResolvers.get(requestId);
      if (resolver) {
        resolver(response);
        this.messageResolvers.delete(requestId);
      }
    });
  }

  protected async sendAndGetJSON(request: RequestObject) {
    const ws = this.ws;

    // Create a Promise to return the WebSocket message.
    const promise = new Promise((resolve, _reject) => {
      const onOpen = () => {
        this.messageResolvers.set(request.id, resolve);
        ws.send(JSON.stringify(request));
      };

      if (ws.readyState === WebSocket.OPEN) {
        // If the WebSocket is already open, send the request immediately.
        onOpen();
      } else {
        // If the WebSocket is still connecting, wait for it to open.
        ws.addEventListener("open", onOpen);
      }
    });

    return await promise;
  }

  close() {
    this.ws.close();
  }
}
