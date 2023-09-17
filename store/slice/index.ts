// rootReducer.ts
import { combineReducers } from 'redux';
import accountReducer from './accountSlice';

const rootReducer = combineReducers({
  accountStore: accountReducer,
});

export default rootReducer;
