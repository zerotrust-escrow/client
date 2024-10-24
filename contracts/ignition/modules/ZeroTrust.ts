// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenAddress = "0x53aAeed4F7b4BFF096E073371227780D5CcDAf71";
const transactionFee = 1;

const ZeroTrustModule = buildModule("ZeroTrustModule", (m) => {
  const ZeroTrust = m.contract("ZeroTrust", [tokenAddress, transactionFee]);

  return { ZeroTrust };
});

export default ZeroTrustModule;

// Successfully verified contract ZeroTrust on the block explorer.
// https://sepolia-blockscout.lisk.com/address/0x22Bd5Fa7ff735B486A57fBe5d80E266EA1240507#code
