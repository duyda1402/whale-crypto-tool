import { abisMockup } from "./abis.mockup";
import { contractsMockup } from "./contracts.mockup";
import { networkMockup } from "./network.mockup";

export const STORE_MOCKUP = {
  version: import.meta.env.BASE_URL || "v1.0.0",
  networks: networkMockup,
  contracts: contractsMockup,
  abis: abisMockup,
  envs: [
    {
      uid: "0eedd803-6fd4-4b3a-9924-eee14a9232b0",
      name: "Global",
    },
  ],
};
