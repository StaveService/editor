import { configureStore, getDefaultMiddleware, Action } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { ThunkAction } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// eslint-disable-next-line import/no-cycle
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['theme'],
};
export type RootState = ReturnType<typeof rootReducer>;
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
];

const excludeLoggerEnvs = ['test', 'production'];
const shouldIncludeLogger = !excludeLoggerEnvs.includes(
  process.env.NODE_ENV || ''
);

if (shouldIncludeLogger) {
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });
  middleware.push(logger);
}

const configuredStore = () => {
  // Create Store
  const store = configureStore({
    reducer: persistedReducer,
    middleware,
  });

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept(
      './rootReducer',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('./rootReducer').default)
    );
  }
  return store;
};

export const store = configuredStore();
export const persistor = persistStore(store);
export type Store = ReturnType<typeof configureStore>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
