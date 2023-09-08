import { JSONRPCClient } from "./client.js";

export function rpcClient(
  transport: JSONRPCClient,
  methodPrefix: string = "",
  skipMethods: string[] = ["constructor"],
  method_name_overrides: Record<string, string> = {}
) {
  function decorator(constructor: Function) {
    const methods = Object.getOwnPropertyNames(constructor.prototype);

    for (const method of methods) {
      if (skipMethods.includes(method)) continue;
      const name = method_name_overrides[method] || method;
      constructor.prototype[method] = rpcMethod(
        transport,
        `${methodPrefix}${name}`
      );
    }
    return void 0;
  }

  return decorator;
}

export function rpcMethod(transport: JSONRPCClient, methodName: string) {
  return async function (...args: any[]) {
    return transport.call(methodName, [...args]);
  };
}
