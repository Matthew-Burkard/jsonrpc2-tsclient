// @ts-ignore
import { rpcClient, RPCWebSocketClient } from "../src";

const transport = new RPCWebSocketClient("ws://localhost:8000/api/v1");

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

@rpcClient(transport, "math.", ["connect", "close"])
class MathClient {
  // @ts-ignore
  async add(a: number, b: number): Promise<number> {}

  // @ts-ignore
  async divide(a: number, b: number): Promise<number> {}

  // @ts-ignore
  async get_distance(a: Vector3, b: Vector3): Promise<Vector3> {}

  connect() {
    transport.connect();
  }

  close() {
    transport.close();
  }
}

test("Result Integration test", async () => {
  let client = new MathClient();
  client.connect();
  const distance = await client.get_distance(
    { x: 1, y: 1, z: 1 },
    { x: 21, y: 13, z: 11 }
  );
  client.close();
  return expect(distance.z).toBe(-10);
});

test("Result Integration test", async () => {
  let client = new MathClient();
  client.connect();
  const sum = await client.add(2, 2);
  client.close();
  return expect(sum).toBe(4);
});

test("Error Integration test", async () => {
  let client = new MathClient();
  client.connect();
  try {
    await client.divide(0, 0);
  } catch (err) {
    return expect(err.message.slice(0, 6)).toBe("-32000");
  } finally {
    client.close();
  }
});
