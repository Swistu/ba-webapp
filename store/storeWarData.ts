import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {WarData} from "../types/warData";
import axios from "axios";

const initialState = {
    warData: {} as WarData,
    loading: false,
    error: ''
};

export const fetchWarData = createAsyncThunk('warData/fetchWarData', () => {
    return axios.get('https://war-service-live.foxholeservices.com/api/worldconquest/war').then(res => res.data as WarData);
});

export const warDataSlice = createSlice({
    name: 'warData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWarData.fulfilled, (state, action) => {
            state.warData = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchWarData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchWarData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Error fetching war data';
        });
    }
});

export default warDataSlice.reducer;