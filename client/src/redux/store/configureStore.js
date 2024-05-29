import { configureStore, Tuple, combineReducers } from '@reduxjs/toolkit'
import userSlice from '../slices/userSlice'
import productSlice from '../slices/productSlice';
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
const persistConfig = {
    key: 'root',
    storage,
  }
  const rootReducer = combineReducers({ 
    user: userSlice,
    product: productSlice,

  })

  const persistedReducer = persistReducer(persistConfig, rootReducer)  
export const store = configureStore({
    reducer: persistedReducer,
  middleware: () => new Tuple( logger),

})

export const persistor = persistStore(store)