import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import Conf from '../Conf/Conf';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

function Carousel() {
    const [trending, setTrending] = useState([]);
    const currency = useSelector((state) => state.cryptoAuth.currency)
    const symbol = useSelector((state) => state.cryptoAuth.symbol)

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&apikey=${Conf.apiKey}`)
        .then((res) => res.json())
        .then((res) => setTrending(res))
        .catch((err) => console.log(err))
    }, [currency])

    console.log("trending data :", trending)

    const items = trending.map((coin) => {
        const profit = coin.price_change_percentage_24h > 0;
        return(
        <Link className='flex flex-col items-center' key={coin?.id} to={`/coin/${coin?.id}`}>
        <img src={coin?.image} alt={coin.name} className='h-16 md:h-32'/>
        <div>
        <span className='uppercase'>{coin.symbol}</span>
        <span style={{
                  color: profit ? "rgb(14, 203, 129)" : "red",
                  fontWeight: 500,
                }}>{" "}
            {profit && "+"}
        {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
        </div>
        <span>{symbol}{" "}{coin.current_price}</span>
        </Link>
        )
    })

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        }
    }

    return (
        <div className='h-1/2 flex flex-row items-center md:w-[90%] m-auto'>
            <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}
            />
        </div>
    )
}

export default Carousel

