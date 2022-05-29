import { RPCHTTPClient } from "../src";

class MathClient extends RPCHTTPClient {
  async add(a: number, b: number): Promise<number> {
    return this.call("add", [a, b]);
  }

  async divide(a: number, b: number): Promise<number> {
    return this.call("divide", [a, b]);
  }
}

let client = new MathClient("http://localhost:8000/api/v1/");

test("Result Integration test", () => {
  return client.add(2, 2).then((sum) => expect(sum).toBe(4));
});
test("Error Integration test", () => {
  return client
    .divide(0, 0)
    .catch((err) =>
      expect(err.message).toBe(
        "-32000: Server error - ZeroDivisionError: division by zero"
      )
    );
});
