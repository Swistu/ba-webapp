import {configureStore} from '@reduxjs/toolkit';
import warData from './storeWarData';

export const store = configureStore({
    reducer: {warData},
});