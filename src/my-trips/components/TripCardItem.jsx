import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function TripCardItem({trip}) {
  const [photoUrl, setPhotoUrl] = useState()
  
      useEffect(() => {
        trip && GetPlacePhoto();
      }, [trip])
      
      const GetPlacePhoto = async ()=>{
        const data = {
          query: trip?.userSelection?.location?.description
        }
        const result = await GetPlaceDetails(data).then(res=>{
          console.log(res.data.results[0].photos[0].
            photo_reference);
          
            const PhotoUrl = PHOTO_REF_URL.replace('name',res.data.results[0].photos[0].
              photo_reference);
              setPhotoUrl(PhotoUrl);
        })
      }
  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all'>
      <img src={photoUrl?photoUrl:"placeholder.png"} alt="" className='object-cover rounded-xl h-[220px]'/>
      <div>
        <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.description}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Day travel with {trip?.userSelection?.budget} Budget</h2>
      </div>
    </div>
    </Link>
  )
}

export default TripCardItem
