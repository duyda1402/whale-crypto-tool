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

const storeMockup = {
  version: import.meta.env.BASE_URL || "v1.0.0",
  networks: networkMockup,
  contracts: contractsMockup,
  abis: abisMockup,
};

const getDataLocal = (): DataLocal => {
  const dataStr = localStorage.getItem(KEY_DATA_LOCALE);
  if (!dataStr) {
    return storeMockup;
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
  version: import.meta.env.BASE_URL || "v1.0.0",
  networks: getDataLocal().networks,
  contracts: getDataLocal().contracts,
  abis: getDataLocal().abis,
};

export const sourceSlice = createSlice({
  name: "source",
  initialState,
  reducers: {
    actionResetStore: (state) => {
      state.abis = storeMockup.abis;
      state.contracts = storeMockup.contracts;
      state.networks = storeMockup.networks;
      setDataLocal("networks", storeMockup.networks);
      setDataLocal("contracts", storeMockup.contracts);
      setDataLocal("abis", storeMockup.abis);
    },

    actionSetNetworks: (state, action: PayloadAction<NetworkIF[]>) => {
      state.networks = action.payload;
      setDataLocal("networks", action.payload);
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    actionAddNetworks: (state, action: PayloadAction<NetworkIF>) => {
      state.networks.push(action.payload);
      setDataLocal("networks", state.networks);
    },

    actionUpdateNetworks: (
      state,
      action: PayloadAction<{ uid: string; network: NetworkIF }>
    ) => {
      const curNetworks = lodash.cloneDeep(state.networks);
      const index = curNetworks.findIndex((e) => e.uid === action.payload.uid);
      if (index !== -1) {
        curNetworks.splice(index, 1, action.payload.network);
      }
      state.networks = curNetworks;
      setDataLocal("networks", curNetworks);
    },

    actionRemoveNetworks: (state, action: PayloadAction<string>) => {
      const curNetworks = lodash.cloneDeep(state.networks);
      const index = curNetworks.findIndex((e) => e.uid === action.payload);
      if (index !== -1) {
        curNetworks.splice(index, 1);
      }
      state.networks = curNetworks;
      setDataLocal("networks", curNetworks);
    },

    actionSetContracts: (state, action: PayloadAction<ContractIF[]>) => {
      state.contracts = action.payload;
      setDataLocal("contracts", action.payload);
    },

    actionAddContracts: (state, action: PayloadAction<ContractIF>) => {
      state.contracts.push(action.payload);
      setDataLocal("contracts", state.contracts);
    },

    actionUpdateContracts: (
      state,
      action: PayloadAction<{ uid: string; data: ContractIF }>
    ) => {
      const curContracts = lodash.cloneDeep(state.contracts);
      const index = curContracts.findIndex((e) => e.uid === action.payload.uid);
      if (index !== -1) {
        curContracts.splice(index, 1, action.payload.data);
      }
      state.contracts = curContracts;
      setDataLocal("contracts", curContracts);
    },

    actionRemoveContracts: (state, action: PayloadAction<string>) => {
      const curContracts = lodash.cloneDeep(state.contracts);
      const index = curContracts.findIndex((e) => e.uid === action.payload);
      if (index !== -1) {
        curContracts.splice(index, 1);
      }
      state.contracts = curContracts;
      setDataLocal("contracts", curContracts);
    },

    actionSetAbis: (state, action: PayloadAction<AbiIF[]>) => {
      state.abis = action.payload;
      setDataLocal("abis", action.payload);
    },

    actionAddAbis: (state, action: PayloadAction<AbiIF>) => {
      state.abis.push(action.payload);
      setDataLocal("abis", state.abis);
    },

    actionUpdateAbis: (
      state,
      action: PayloadAction<{ uid: string; data: AbiIF }>
    ) => {
      const curAbis = lodash.cloneDeep(state.abis);
      const index = curAbis.findIndex((e) => e.uid === action.payload.uid);
      if (index !== -1) {
        curAbis.splice(index, 1, action.payload.data);
      }
      state.abis = curAbis;
      setDataLocal("abis", curAbis);
    },

    actionRemoveAbis: (state, action: PayloadAction<string>) => {
      const curAbis = lodash.cloneDeep(state.abis);
      const index = curAbis.findIndex((e) => e.uid === action.payload);
      if (index !== -1) {
        curAbis.splice(index, 1);
      }
      state.abis = curAbis;
      setDataLocal("abis", curAbis);
    },
  },
});

export const {
  actionResetStore,
  actionSetContracts,
  actionSetNetworks,
  actionRemoveNetworks,
  actionUpdateNetworks,
  actionAddNetworks,
  actionAddContracts,
  actionUpdateContracts,
  actionRemoveContracts,
  actionAddAbis,
  actionSetAbis,
  actionUpdateAbis,
  actionRemoveAbis,
} = sourceSlice.actions;

export const sourceReducer = sourceSlice.reducer;
