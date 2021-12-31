import { RequestObject } from "./objects.js";
import { JSONRPCClient } from "./client.js";
import axios from "axios";

export class RPCHTTPClient extends JSONRPCClient {
  url: string;
  headers: object;

  constructor(url: string, headers: object = null) {
    super();
    this.url = url;
    this.headers = headers || {};
    this.headers["Content-Type"] = "application/json";
  }

  async sendAndGetJSON(request: RequestObject): Promise<any> {
    return (await axios.post(this.url, request, { headers: this.headers }))
      .data;
  }
}
