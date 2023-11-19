import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../store/slices/searchSlice';
import { api } from './slices/api/api';
import { setupListeners } from '@reduxjs/toolkit/query';
import detailsPageReducer from '../store/slices/detailsPageSlice';
import mainPageReducer from '../store/slices/mainPageSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    mainPage: mainPageReducer,
    detailsPage: detailsPageReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
