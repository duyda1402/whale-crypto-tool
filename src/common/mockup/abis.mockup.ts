import erc20 from "./abi/erc20.json";
import gdn from "./abi/gdn.json";
import multiSig from "./abi/multiSig.json";
import multiSigFactory from "./abi/multiSigFactory.json";
import concierge from "./abi/concierge.json";
import payroll from "./abi/payroll.json";

export const abisMockup = [
  {
    uid: "66bd1795-8191-4931-8287-3554112de992",
    name: "ERC 20",
    payload: JSON.stringify(erc20),
    isSystem: true,
  },
  {
    uid: "e041a76e-d578-4910-93c1-cbfed4d8b644",
    name: "GDN ABI",
    payload: JSON.stringify(gdn),
    isSystem: false,
  },
  {
    uid: "39ee9b26-d139-4951-8c89-1561a53ec68b",
    name: "Multisig ABI",
    payload: JSON.stringify(multiSig),
    isSystem: false,
  },
  {
    uid: "e1c9854a-ab71-4e8a-ae4d-3e076049e169",
    name: "Multisig Factory ABI",
    payload: JSON.stringify(multiSigFactory),
    isSystem: false,
  },
  {
    uid: "41d9c280-3924-4174-9996-1bb1e9c05554",
    name: "Concierge ABI",
    payload: JSON.stringify(concierge),
    isSystem: false,
  },
  {
    uid: "c53a641c-009d-46ba-abdb-ad8c394e19dc",
    name: "Payroll ABI",
    payload: JSON.stringify(payroll),
    isSystem: false,
  },
];
