import { configureStore } from "@reduxjs/toolkit";
import { dataApi } from "../Services/dataApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [dataApi.reducerPath]: dataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataApi.middleware),
});

setupListeners(store.dispatch);
