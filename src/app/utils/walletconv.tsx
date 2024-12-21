// src/utils/helpers.ts
import { createHash } from "crypto";

export function walletAddressToInt(walletAddress: string): number {
  const hash = createHash("sha256").update(walletAddress).digest("hex");
  const bigInt = BigInt("0x" + hash);
  const number = bigInt % BigInt(Number.MAX_SAFE_INTEGER);
  return Number(number);
}
