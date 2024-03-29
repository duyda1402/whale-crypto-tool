export enum AssetType {
  BASE = "base",
  ERC20 = "erc20",
}

export enum AddressPath {
  Address = "address",
  Wallets = "wallets",
}

export enum BlockPath {
  Block = "block",
  Blocks = "blocks",
}

export enum TokenPath {
  Token = "token",
}

export enum TxPath {
  Transactions = "transactions",
  Tx = "tx",
}

export enum TypeNode {
  Etherscan = "etherscan",
  Infura = "infura",
  Pocket = "pocket",
  RPC = "rpc",
}

export enum FiatCurrency {
  USD = "USD",
  VND = "VND",
  EUR = "EUR",
  CNY = "CNY",
  GBP = "GBP",
}

export enum Language {
  EN = "en",
  VN = "vn",
  CN = "cn",
}

export enum Extension {
  WEB3 = "web3",
}

export const ErrorBlockChain = {
  4001: "The user rejected the request.",
  4901: "The Provider is not connected to the requested chain.",
  9000: "Something went wrong!",
  4100: "The requested method and/or account has not been authorized",
  5001: "Contract for token not setup with current network",
  3001: "ERC20: insufficient allowance",
  9999: "Ethereum not available",
  5002: "Network not connected, Please connecting to the other network",
};

export enum PATH_ROUTER_BASE {
  NETWORK_PAGE = "/network",
  CONTRACT_PAGE = "/contract",
  ABI_PAGE = "/abi",
  SETTING_PAGE = "/setting",
  HOME_PAGE = "/",
}
