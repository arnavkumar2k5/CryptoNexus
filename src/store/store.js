import {configureStore} from '@reduxjs/toolkit'
import CryptoReducer from './CryptoSlice'

const store = configureStore({
    reducer: {
        cryptoAuth: CryptoReducer
    }
})

export default store