import React from 'react'
import { Link } from 'react-router-dom';

function Hotels({trip}) {
    const hotels = trip?.tripData?.[0]?.hotelOptions;
    console.log(hotels);
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        { hotels?.length > 0 &&
        hotels.map((hotel,index)=>(
            <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.hotelName+","+hotel.hotelAddress} target='_blank'>
            <div className='hover:scale-105 transition-all cursor-pointer'>
                <img src="/placeholder.png" className='rounded-lg' />
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium'>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                    <h2 className='text-sm'>💰 {hotel?.price}</h2>
                    <h2 className='text-sm'>⭐ {hotel.rating} stars</h2>
                </div>
            </div>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default Hotels
