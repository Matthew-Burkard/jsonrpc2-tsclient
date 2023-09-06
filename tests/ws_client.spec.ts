// @ts-ignore
import { RPCWebsocketClient } from "../src";

class MathClient extends RPCWebsocketClient {
  async add(a: number, b: number): Promise<number> {
    return this.call("math.add", [a, b]);
  }

  async divide(a: number, b: number): Promise<number> {
    return this.call("math.divide", [a, b]);
  }
}

test("Result Integration test", async () => {
  let client = new MathClient("ws://localhost:8000/api/v1");
  const sum = await client.add(2, 2);
  client.close();
  return expect(sum).toBe(4);
});
test("Error Integration test", async () => {
  let client = new MathClient("ws://localhost:8000/api/v1");
  try {
    return await client.divide(0, 0);
  } catch (err) {
    return expect(err.message).toBe(
      "-32000: Server error - ZeroDivisionError: division by zero"
    );
  } finally {
    client.close();
  }
});
