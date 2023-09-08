// @ts-ignore
import { rpcClient, RPCHTTPClient } from "../src";

const transport = new RPCHTTPClient("http://localhost:8000/api/v1");

@rpcClient(transport, "math.", ["connect", "close"])
class MathClient {
  // @ts-ignore
  async add(a: number, b: number): Promise<number> {}

  // @ts-ignore
  async divide(a: number, b: number): Promise<number> {}
}

test("Result Integration test", async () => {
  let client = new MathClient();
  const sum = await client.add(2, 2);
  return expect(sum).toBe(4);
});

test("Error Integration test", async () => {
  let client = new MathClient();
  try {
    return await client.divide(0, 0);
  } catch (err) {
    return expect(err.message.slice(0, 6)).toBe("-32000");
  }
});
