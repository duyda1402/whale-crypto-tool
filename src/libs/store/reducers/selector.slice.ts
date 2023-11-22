import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { NetworkIF } from "../../../common/types";

// Define a type for the slice state
interface SelectorState {
  network: NetworkIF | null;
}

// Define the initial state using that type
const initialState: SelectorState = {
  network: null,
};

export const selectorSlice = createSlice({
  name: "selector",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    actionSelectNetwork: (state, action: PayloadAction<NetworkIF>) => {
      state.network = action.payload;
    },
  },
});

export const { actionSelectNetwork } = selectorSlice.actions;

export const selectorReducer = selectorSlice.reducer;
