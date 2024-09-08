import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { currencyChange } from '../store/CryptoSlice';

function Header() {
    const currency = useSelector((state) => state.cryptoAuth.currency)
    const dispatch = useDispatch();

    const handleCurrencyChange = (e) => {
        const selectedCurrency = e.target.value;

        if(selectedCurrency == 'inr'){
            dispatch(currencyChange({currency: 'inr', symbol: '₹'}));
        } else if(selectedCurrency == 'usd'){
            dispatch(currencyChange({currency: 'usd', symbol: '$'}));
        }
    }

    return (
        <header className='p-4'>
        <div>
            <nav>
        <div className='flex justify-between items-center'>
            <div>
                <Link to="/" className='uppercase font-bold md:font-extrabold md:ml-10'>
                CryptoNexus
                </Link>
            </div>
            <div className='md:mr-10'>
                <select value={currency} onChange={handleCurrencyChange} className='text-sm p-2 w-20 text-[#FFD700] rounded-l rounded-r bg-transparent border-2 border-[#FFD700]'>
                    <option value={'usd'} className='bg-[#1E293B]'>USD</option>
                    <option value={'inr'} className='bg-[#1E293B]'>INR</option>
                </select>
            </div>
            </div>
            </nav>
        </div>
        </header>
    )
}

export default Header
