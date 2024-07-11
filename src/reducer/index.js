// src/redux/reducers/index.js

import { combineReducers } from 'redux';
import planReducer from '../slice/planSlice';

const rootReducer = combineReducers({
  plans: planReducer,
  // Add other reducers here if any
});

export default rootReducer;
