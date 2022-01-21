/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    circuit: {},
    formulaOne: {},
    formulaTwo: {},
    saison: [],
    entitySetup: {},
};
export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        setCircuit: (state, action) => ({ ...state, circuit: action.payload }),
        setFormulaOne: (state, action) => ({
            ...state,
            formulaOne: action.payload,
        }),
        setFormulaTwo: (state, action) => ({
            ...state,
            formulaTwo: action.payload,
        }),
        setSaison: (state, action) => ({
            ...state,
            saison: action.payload,
        }),
        setEntitySetup: (state, action) => ({
            ...state,
            entitySetup: action.payload,
        }),
        reset: (state) => initialState,
    },
});

export const listActions = listSlice.actions;

export default listSlice.reducer;
