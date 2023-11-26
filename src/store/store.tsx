import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import searchReducer from "../store/slices/searchSlice";
import { api } from "./slices/api/api";
import detailsPageReducer from "../store/slices/detailsPageSlice";
import mainPageReducer from "../store/slices/mainPageSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      search: searchReducer,
      mainPage: mainPageReducer,
      detailsPage: detailsPageReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(() => store, {
  debug: true,
  serializeState: (state) => state,
  deserializeState: (state) => state,
});
