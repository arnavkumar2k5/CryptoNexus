import React from 'react'
import Carousel from './Carousel'

function Banner() {
    return (
        <div className='h-[50vh] m-auto flex flex-col justify-center text-center' style={{
            backgroundImage: `url('/18129290.jpg')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            overflow: "hidden",
        }}>
            <div>
                <div>
                    <h2 className='uppercase font-bold text-2xl md:text-4xl'>CryptoNexus</h2>
                    <p className='uppercase mt-2 mb-10'>Connecting you to the world of cryptocurrency</p>
                    <Carousel/>
                </div>
            </div>
        </div>
    )
}

export default Banner
