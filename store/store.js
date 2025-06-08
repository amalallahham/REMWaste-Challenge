import { configureStore } from "@reduxjs/toolkit";
import { skipsApi } from "./services/skipsApi";
import filterReducer from './reducers/filterSlice';
import themeReducer from './reducers/themeSlice';

export const store = configureStore({
  reducer: {
    [skipsApi.reducerPath]: skipsApi.reducer,
    filters: filterReducer,
    theme: themeReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(skipsApi.middleware),
});
