import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ContractIF, NetworkIF } from "../../../common/types";

// Define a type for the slice state
interface SelectorState {
  network: NetworkIF | null;
  isLoadingNetwork: boolean;
  contract: ContractIF | null;
}

// Define the initial state using that type
const initialState: SelectorState = {
  network: null,
  isLoadingNetwork: false,
  contract: null,
};

export const selectorSlice = createSlice({
  name: "selector",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    actionSelectNetwork: (state, action: PayloadAction<NetworkIF | null>) => {
      state.network = action.payload;
    },
    actionLoadingNetwork: (state, action: PayloadAction<boolean>) => {
      state.isLoadingNetwork = action.payload;
    },
    actionSelectContract: (state, action: PayloadAction<ContractIF | null>) => {
      state.contract = action.payload;
    },
  },
});

export const {
  actionSelectNetwork,
  actionLoadingNetwork,
  actionSelectContract,
} = selectorSlice.actions;

export const selectorReducer = selectorSlice.reducer;
