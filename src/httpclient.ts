import { RequestObject } from "./objects.js";
import { JSONRPCClient } from "./client.js";
import axios, { AxiosRequestHeaders } from "axios";

export class RPCHTTPClient extends JSONRPCClient {
  url: string;
  headers: AxiosRequestHeaders;

  constructor(url: string, headers: AxiosRequestHeaders | null = null) {
    super();
    this.url = url;
    this.headers = headers || {};
    this.headers["Content-Type"] = "application/json";
  }

  protected async sendAndGetJSON(request: RequestObject): Promise<any> {
    return (await axios.post(this.url, request, { headers: this.headers }))
      .data;
  }
}
