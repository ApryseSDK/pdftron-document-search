import { configureStore } from '@reduxjs/toolkit';
import firebaseReducer from '../Firebase/firebaseSlice';
import ViewReducer from '../components/View/ViewSlice';

export default configureStore({
  reducer: {
    firebase: firebaseReducer,
    viewDoc: ViewReducer,
  },
});
