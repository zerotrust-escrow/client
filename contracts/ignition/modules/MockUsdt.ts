import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const INITIAL_SUPPLY = 10000;

const MockUsdtModule = buildModule("MockUsdtModule", (m) => {
  const MockUsdt = m.contract("MockUsdt", [INITIAL_SUPPLY]);

  return { MockUsdt };
});

export default MockUsdtModule;


// Deployed and Verified and Available at
// https://sepolia-blockscout.lisk.com/address/0x53aAeed4F7b4BFF096E073371227780D5CcDAf71#code
