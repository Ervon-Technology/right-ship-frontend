import { configureStore } from '@reduxjs/toolkit';
import empreducer from './slice/Empslice'; // Replace with your root reducer file

const store = configureStore({
    reducer: {
        emp: empreducer,
      },
});

export default store;
