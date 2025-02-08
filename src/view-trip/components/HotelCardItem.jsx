import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HotelCardItem({hotel}) {

     const [photoUrl, setPhotoUrl] = useState()
    
        useEffect(() => {
          hotel && GetPlacePhoto();
        }, [hotel])
        
        const GetPlacePhoto = async ()=>{
          const data = {
            query: hotel?.hotelName
          }
          const result = await GetPlaceDetails(data).then(res=>{
            console.log(res.data.results[0].photos[0].
              photo_reference);
            
              const PhotoUrl = PHOTO_REF_URL.replace('name',res.data.results[0].photos[0].
                photo_reference);
                // console.log(PhotoUrl);
                setPhotoUrl(PhotoUrl);
          })
        }
  return (
    
    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.hotelName+","+hotel.hotelAddress} target='_blank'>
            <div className='hover:scale-105 transition-all cursor-pointer mt-3 my-5'>
                <img src={photoUrl?photoUrl : "/placeholder.png"} className='rounded-lg h-[180px] w-full object-cover' />
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium'>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                    <h2 className='text-sm'>💰 {hotel?.price}</h2>
                    <h2 className='text-sm'>⭐ {hotel.rating} stars</h2>
                </div>
            </div>
        </Link>
    
  )
}

export default HotelCardItem
