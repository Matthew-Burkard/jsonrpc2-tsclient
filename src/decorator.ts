import { JSONRPCClient } from "./client";

export function rpcClient(
  transport: JSONRPCClient,
  methodPrefix: string | null = null,
  skipMethods: string[] = ["constructor"]
) {
  methodPrefix = methodPrefix || "";

  function decorator(constructor: Function) {
    const methods = Object.getOwnPropertyNames(constructor.prototype);

    for (const method of methods) {
      if (skipMethods.includes(method)) continue;
      constructor.prototype[method] = async function (...args: any[]) {
        return transport.call(`${methodPrefix}${method}`, [...args]);
      };
    }
    return void 0;
  }

  return decorator;
}
