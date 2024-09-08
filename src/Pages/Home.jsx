import React, { useEffect, useState } from 'react'
import Conf from '../Conf/Conf';
import CoinTable from '../Components/CoinTable';
import Banner from '../Components/Banner';

function Home() {
    return (
        <>
        <Banner/>
        <div className='text-center text-4xl mt-10 font-medium'>Cryptocurrency Prices by Market Cap</div>
        <div className='w-full'>
        <CoinTable/>
        </div>
        </>
    )
}

export default Home
