import {
  ErrorResponseObject,
  RequestObject,
  ResultResponseObject
} from "./objects.js";
import {getErrorByCode, ServerError} from "./errors.js";

export abstract class JSONRPCClient {

  genId(): number {
    return Math.floor(Math.random() * 100000);
  }

  protected abstract sendAndGetJSON(request: RequestObject): Promise<any>

  protected async call(method: string, params?: any[] | object): Promise<any> {
    let request = new RequestObject(this.genId(), method, params);
    let data = await this.sendAndGetJSON(request);
    let response;
    if (data.result !== undefined) {
      response = Object.assign(new ResultResponseObject(), data);
      return response.result;
    } else if (data.error !== undefined) {
      response = Object.assign(new ErrorResponseObject(), data);
      let error = response.error;
      throw new (getErrorByCode(error.code) ?? ServerError)(error);
    } else {
      throw Error(`Invalid response: ${data}`);
    }
  }
}
