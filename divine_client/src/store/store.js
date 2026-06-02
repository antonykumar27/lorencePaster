import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import { userApi } from "./UserApi";
import { prayerRequestApi } from "./PrayerRequestApi";
import { programApi } from "./ProgrammsApi";
import { galleryApi } from "./GalleryApi";

export const store = configureStore({
  reducer: {
    // Add the userApi reducer
    [userApi.reducerPath]: userApi.reducer,
    [prayerRequestApi.reducerPath]: prayerRequestApi.reducer,
    [programApi.reducerPath]: programApi.reducer,
    [galleryApi.reducerPath]: galleryApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(prayerRequestApi.middleware)
      .concat(programApi.middleware)
      .concat(galleryApi.middleware),
});

setupListeners(store.dispatch); // Set up listeners for RTK query

export default store;
