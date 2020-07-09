import { configureStore } from '@reduxjs/toolkit';
import firebaseReducer from '../Firebase/firebaseSlice';

export default configureStore({
  reducer: {
    firebase: firebaseReducer 
  },
});
