import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currency: 'usd',
    symbol: '$'
}

const CryptoSlice = createSlice({
    name: 'cryptoAuth',
    initialState,
    reducers: {
        currencyChange: (state, action) => {
            state.currency = action.payload.currency;
            state.symbol = action.payload.symbol;
        }
    }
})

export const {currencyChange} = CryptoSlice.actions;
export default CryptoSlice.reducer;