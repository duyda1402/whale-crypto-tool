import { ConnectionInfo } from "ethers/lib/utils";

export interface NetworkIF {
  uid: string;
  icon?: string;
  networkName: string;
  rpcUrl: string;
  chainId: number | string;
  currencySymbol: string;
  blockExplorerUrl?: string;
  isSystem?: boolean;
  connectionInfo?: ConnectionInfo;
}
