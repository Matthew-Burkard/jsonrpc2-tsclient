import {
  ErrorResponseObject,
  RequestObject,
  ResultResponseObject,
} from "./objects.js";
import { getErrorByCode, ServerError } from "./errors.js";

export abstract class JSONRPCClient {
  public preCallHooks: CallableFunction[] = [];
  public preCallAsyncHooks: CallableFunction[] = [];
  private ids: Map<number, number> = new Map();

  private getId(): number {
    let max = 0;
    for (const it of this.ids.values()) {
      if (it > max) {
        max = it;
      }
    }
    let newId = max + 1;
    this.ids[newId] = newId;
    return newId;
  }

  protected abstract sendAndGetJSON(request: RequestObject): Promise<any>;

  async call(method: string, params?: any[] | object): Promise<any> {
    this.preCallHooks.map((it) => it());
    await Promise.all(this.preCallAsyncHooks.map((it) => it()));

    let request = new RequestObject(this.getId(), method, params);
    let data = await this.sendAndGetJSON(request);
    let response;
    if (data.id !== undefined) {
      this.ids.delete(data.id);
    }
    if (data.result !== undefined) {
      response = Object.assign(new ResultResponseObject(), data);
      return response.result;
    } else if (data.error !== undefined) {
      response = Object.assign(new ErrorResponseObject(), data);
      let error = response.error;
      throw new (getErrorByCode(error.code) || ServerError)(error);
    } else {
      throw Error(`Invalid response: ${data}`);
    }
  }
}
