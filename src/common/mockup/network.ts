import iconEthereum from "../../assets/eth_logo.png";
import iconPolygon from "../../assets/matic-token.png";
import iconPolygonMumbai from "../../assets/matic-test.png";
export const networkSystem = [
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
  {
    uid: "54f1ef04-05a1-4d8a-81fd-7cb96d20b550",
    icon: iconPolygonMumbai,
    networkName: "Polygon Mumbai",
    rpcUrl:
      "https://thrumming-alpha-ensemble.matic-testnet.discover.quiknode.pro/2b56e549f5b335918acccab0818ac11791bb4fbd",
    chainId: 80001,
    currencySymbol: "MATIC",
    blockExplorerUrl: "https://mumbai.polygonscan.com",
    isSystem: false,
  },
];
