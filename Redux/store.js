import {legacy_createStore as createStore} from 'redux';
import {composeWithDevTools} from 'remote-redux-devtools';
import userReducer from './Reducers/UserReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = createStore(persistedReducer, composeWithDevTools());
export const persistor = persistStore(store);
