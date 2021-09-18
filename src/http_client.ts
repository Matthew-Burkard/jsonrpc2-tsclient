import {RequestObject} from "./objects.js";
import {JSONRPCClient} from "./client.js";
import axios from "axios";

export class RPCHTTPClient extends JSONRPCClient {
  url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  async sendAndGetJSON(request: RequestObject): Promise<any> {
    return (await axios.post(this.url, request)).data;
  }
}
