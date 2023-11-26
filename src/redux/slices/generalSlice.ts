import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IGeneralState {
    isMobile: boolean
}

const initialState: IGeneralState = {
    isMobile: window.innerWidth < 916, 
}

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setIsMobile: (state, action: PayloadAction<boolean>) => {
            state.isMobile = action.payload;
        },
    }
})

export const {setIsMobile} = generalSlice.actions
export default generalSlice.reducer
