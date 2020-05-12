import userReducer from './reducers/user';
import {createStore, combineReducers} from 'redux';

const rootReducer = combineReducers({
  user: userReducer,
});

const storeConfig = () => createStore(rootReducer);

export default storeConfig;
