import { configureStore } from "@reduxjs/toolkit";
import { selectorReducer } from "./reducers/selector.slice";
import { sourceReducer } from "./reducers/source.slice";

export const store = configureStore({
  reducer: {
    selector: selectorReducer,
    source: sourceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
