import type { Transaction } from "@/types/web3";

/**
 * Generates mock transactions relative to a wallet address.
 * In production you'd replace this with etherscan/alchemy API calls.
 */
export function getMockTransactions(address: string): Transaction[] {
  const now = Math.floor(Date.now() / 1000);
  const hour = 3600;

  return [
    {
      hash: "0xabc123def456abc123def456abc123def456abc123def456abc123def456abc1",
      from: address,
      to: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      value: "0.05",
      timestamp: now - hour * 1,
      status: "success",
      type: "sent",
    },
    {
      hash: "0x111aaa222bbb333ccc444ddd555eee666fff777888999000aaabbbccc111222",
      from: "0x742d35Cc6634C0532925a3b8D4C9f5e08b8C2B15",
      to: address,
      value: "1.2",
      timestamp: now - hour * 5,
      status: "success",
      type: "received",
    },
    {
      hash: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
      from: address,
      to: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      value: "0.001",
      timestamp: now - hour * 12,
      status: "success",
      type: "contract",
    },
    {
      hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      from: address,
      to: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      value: "0.3",
      timestamp: now - hour * 24,
      status: "failed",
      type: "sent",
    },
    {
      hash: "0xffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff0001",
      from: "0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8",
      to: address,
      value: "2.5",
      timestamp: now - hour * 36,
      status: "success",
      type: "received",
    },
    {
      hash: "0x9999888877776666555544443333222211110000aaaabbbbccccddddeeeeffff",
      from: address,
      to: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      value: "0.75",
      timestamp: now - hour * 48,
      status: "pending",
      type: "contract",
    },
  ];
}
