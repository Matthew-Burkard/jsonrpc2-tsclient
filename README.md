# JSON RPC 2.0 Client

A collection of classes for creating JSON RPC 2.0 clients in TypeScript.

## Usage

If a JSON RPC server defines the methods "add", "subtract", and "divide", expecting the following requests:

```json
{
  "id": 1,
  "method": "add",
  "params": [2, 3],
  "jsonrpc": "2.0"
}

{
  "id": 2,
  "method": "subtract",
  "params": [2, 3],
  "jsonrpc": "2.0"
}

{
  "id": 3,
  "method": "divide",
  "params": [3, 2],
  "jsonrpc": "2.0"
}
```

Defining and using the corresponding client would look like this:

```typescript
class MathClient extends RPCHTTPClient {
  async add(a: number, b: number): Promise<number> {
    return await this.call('add', [a, b]);
  }
  async subtract(a: number, b: number): Promise<number> {
    return await this.call('subtract', [a, b]);
  }
  async divide(a: number, b: number): Promise<number> {
    return await this.call('divide', [a, b]);
  }
}

var client = new MathClient('http://localhost:5000/api/v1');
client.add(2, 3).then(res => console.log(res));
client.subtract(2, 3).then(res => console.log(res));
client.divide(3, 2).then(res => console.log(res));
```

## Errors

If the server responds with an error, an RpcError is thrown.
There is an RpcError for each standard JSON RPC 2.0 error, each of them extends RpcError.

```typescript
var client = new MathClient('http://localhost:5000/api/v1');

client.add('two', 'three')
  .then(res => console.log(res))
  .catch(error => console.log(error));  // InvalidParams error.

client.divide(0, 0)
  .then(res => console.log(res))
  .catch(error => console.log(error));  // ServerError error.
```
