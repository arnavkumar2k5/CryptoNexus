import React, { useEffect, useState } from 'react'
import Conf from '../Conf/Conf'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import HTMLReactParser from 'html-react-parser'
import {numberWithCommas} from '../Components/CoinTable'
import CoinInfo from '../Components/CoinInfo';

function CoinPage() {
    const [coin, setCoin] = useState([]);
    const currency = useSelector((state) => state.cryptoAuth.currency)
    const symbol = useSelector((state) => state.cryptoAuth.symbol)
    const {id} = useParams()

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/${id}?apikey=${Conf.apiKey}`)
        .then((res) => res.json())
        .then((res) => setCoin(res))
        .catch((err) => console.log(err)) 
    }, [currency, id])

    console.log("page", coin)

    
    return (
        <div className='flex flex-col md:flex-row p-5'>
            <div className='md:w-[35%] md:border-r-2 mr-5 p-3'>
                <img src={coin?.image?.large} alt={coin.name} className='m-auto w-1/2 md:w-[14vw] mb-3 md:mb-5'/>
                <div className='text-2xl md:text-5xl text-center font-bold mb-4'>{coin?.name}</div>
                <div className='md:text-xl text-justify'>{coin?.description?.en && HTMLReactParser(coin?.description?.en.split(". ")[0])}</div>
                <div className='md:text-2xl mt-7'><b>Rank:</b> {coin?.market_cap_rank}</div>
                <div className='md:text-2xl'><b>Current Price:</b> {symbol} {numberWithCommas(coin?.market_data?.current_price[currency])}</div>
                <div className='md:text-2xl'><b>Market Cap:</b> {symbol} {numberWithCommas(coin?.market_data?.market_cap[currency].toString().slice(0, -6))}M</div>
            </div>
            <div className='w-full md:w-[90%] m-auto md:ml-5'>
                <CoinInfo/>
            </div>
        </div>
    )
}

export default CoinPage
