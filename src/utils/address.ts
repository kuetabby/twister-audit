import { utils } from "ethers";

export const { isAddress } = utils;

export const zeroAddress = "0x0000000000000000000000000000000000000000";
export const deadAddress = "0x000000000000000000000000000000000000dead";

export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${address.substring(0, chars + 2)}...${address.substring(
    42 - chars
  )}`;
}

export function isValidEthereumAddress(address: string) {
  return isAddress(address) && address !== zeroAddress;
}
