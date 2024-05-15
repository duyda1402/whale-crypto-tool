import iconEthereum from "../../assets/eth_logo.png";
import iconPolygon from "../../assets/matic-token.png";

export const networkMockup = [
  {
    uid: "fb231599-85d9-4faa-8361-82fd5ccbcd02",
    icon: iconEthereum,
    networkName: "Ethereum Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/",
    chainId: 1,
    currencySymbol: "ETH",
    blockExplorerUrl: "https://etherscan.io",
    isSystem: true,
  },
  {
    uid: "b7498456-5114-4655-b521-06df314e5ded",
    icon: iconPolygon,
    networkName: "Polygon Mainnet",
    rpcUrl: "https://polygon-mainnet.infura.io",
    chainId: 137,
    currencySymbol: "MATIC",
    blockExplorerUrl: "https://polygonscan.com",
    isSystem: true,
  },
];
