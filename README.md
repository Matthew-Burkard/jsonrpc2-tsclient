# JSON RPC 2.0 Client

A collection of classes for creating JSON RPC 2.0 clients.

### Install

npm

```shell
npm i jsonrpc2-tsclient
```

yarn

```shell
yarn add jsonrpc2-tsclient
```

### JSONRPCClient Abstract Class

JSON-RPC 2.0 is transport agnostic. This library provides an abstract
class that can be extended to create clients for different transports.

### Implementations

To make client for a transport, extend the `JSONRPCClient` class and
implement the `sendAndGetJSON` which takes a request object and is
expected to return a JSON-RPC 2.0 response as an object. `JSONRPCClient`
has a `call` method that uses this internally.

A default HTTP implementation is provided:

```typescript
export class RPCHTTPClient extends JSONRPCClient {
  url: string;
  headers: object;

  constructor(url: string, headers: object | null = null) {
    super();
    this.url = url;
    this.headers = headers || {};
    this.headers["Content-Type"] = "application/json";
  }

  protected async sendAndGetJSON(request: RequestObject): Promise<any> {
    return (await axios.post(this.url, request, {headers: this.headers})).data;
  }
}
```

### Usage

The `JSONRPCClient` will handle forming requests and parsing responses.
To call a JSON-RPC 2.0 method with an implementation of `JSONRPCClient`,
call the `call` method, passing it the name of the method to call and
the params.

If the response is JSON-RPC 2.0 result object, only the result will be
returned, none of the wrapper.

If the response is JSON-RPC 2.0 error response, and exception will be
thrown for the error.

```typescript
import {RPCHTTPClient} from "jsonrpc2-tsclient";

let client = new RPCHTTPClient("http://localhost:5000/api/v1/");
client.call("divide", [0, 0])
  .then(res => console.log(`JSON-RPC Result: ${res}`))
  .catch(err => console.log(`JSON-RPC Error: ${err}`));
```
