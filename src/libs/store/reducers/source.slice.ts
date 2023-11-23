import lodash from "lodash";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AbiIF, ContractIF, DataLocal, NetworkIF } from "../../../common/types";
import { KEY_DATA_LOCALE } from "../../../common";
import { networkMockup } from "../../../common/mockup/network.mockup";
import { abisMockup } from "../../../common/mockup/abis.mockup";
import { contractsMockup } from "../../../common/mockup/contracts.mockup";

// Define a type for the slice state
interface SourceState {
  version: string;
  networks: NetworkIF[];
  contracts: ContractIF[];
  abis: AbiIF[];
}

const getDataLocal = (): DataLocal => {
  const dataStr = localStorage.getItem(KEY_DATA_LOCALE);
  if (!dataStr) {
    return {
      networks: networkMockup,
      contracts: contractsMockup,
      abis: abisMockup,
    };
  }
  return JSON.parse(dataStr);
};

const setDataLocal = (path: string, data: any): void => {
  const curData = lodash.cloneDeep(getDataLocal());
  lodash.set(curData, path, data);
  localStorage.setItem(KEY_DATA_LOCALE, JSON.stringify(curData));
};
// Define the initial state using that type
const initialState: SourceState = {
  version: "v1.0.0",
  networks: getDataLocal().networks,
  contracts: getDataLocal().contracts,
  abis: getDataLocal().abis,
};

export const sourceSlice = createSlice({
  name: "source",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    actionSetNetworks: (state, action: PayloadAction<NetworkIF[]>) => {
      state.networks = action.payload;
      setDataLocal("networks", action.payload);
    },
    actionSetContracts: (state, action: PayloadAction<ContractIF[]>) => {
      state.contracts = action.payload;
      setDataLocal("contracts", action.payload);
    },
    actionSetAbis: (state, action: PayloadAction<AbiIF[]>) => {
      state.abis = action.payload;
      setDataLocal("abis", action.payload);
    },
  },
});

export const { actionSetNetworks, actionSetContracts, actionSetAbis } =
  sourceSlice.actions;

export const sourceReducer = sourceSlice.reducer;
