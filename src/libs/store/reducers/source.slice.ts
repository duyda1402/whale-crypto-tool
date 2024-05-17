import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import lodash from "lodash";
import { KEY_DATA_LOCALE } from "../../../common";
import { STORE_MOCKUP } from "../../../common/mockup";
import {
  AbiIF,
  ContractIF,
  DataLocal,
  EnvIF,
  NetworkIF,
} from "../../../common/types";

// Define a type for the slice state
interface SourceState {
  version: string;
  networks: NetworkIF[];
  contracts: ContractIF[];
  abis: AbiIF[];
  envs: EnvIF[];
}

const getDataLocal = (): DataLocal => {
  const dataStr = localStorage.getItem(KEY_DATA_LOCALE);
  if (!dataStr) {
    return STORE_MOCKUP;
  }
  return JSON.parse(dataStr);
};

const setDataLocal = (path: string, data: any): void => {
  const dataStr = localStorage.getItem(KEY_DATA_LOCALE) || "{}";
  const curData = { ...JSON.parse(dataStr) };
  lodash.set(curData, path, data);
  localStorage.setItem(KEY_DATA_LOCALE, JSON.stringify(curData));
};
// Define the initial state using that type
const initialState: SourceState = {
  version: import.meta.env.BASE_URL || "v1.0.0",
  networks: getDataLocal().networks,
  contracts: getDataLocal().contracts,
  abis: getDataLocal().abis,
  envs: getDataLocal().envs,
};

export const sourceSlice = createSlice({
  name: "source",
  initialState,
  reducers: {
    actionResetStore: (state) => {
      state.abis = STORE_MOCKUP.abis;
      state.contracts = STORE_MOCKUP.contracts;
      state.networks = STORE_MOCKUP.networks;
      state.envs = STORE_MOCKUP.envs;
      setDataLocal("networks", STORE_MOCKUP.networks);
      setDataLocal("contracts", STORE_MOCKUP.contracts);
      setDataLocal("abis", STORE_MOCKUP.abis);
      setDataLocal("envs", STORE_MOCKUP.envs);
    },

    actionImportStore: (state, action: PayloadAction<DataLocal>) => {
      console.log("data-import", action.payload);
      state.abis = action.payload.abis || [];
      state.contracts = action.payload.contracts || [];
      state.networks = action.payload.networks || [];
      state.envs = action.payload.envs || [];
      setDataLocal("networks", action.payload.networks || []);
      setDataLocal("contracts", action.payload.contracts || []);
      setDataLocal("abis", action.payload.abis || []);
      setDataLocal("envs", action.payload.envs || []);
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
  actionImportStore,
} = sourceSlice.actions;

export const sourceReducer = sourceSlice.reducer;
