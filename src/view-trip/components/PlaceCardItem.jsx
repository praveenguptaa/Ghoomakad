import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PlaceCardItem({ place }) {

  const [photoUrl, setPhotoUrl] = useState()
  
      useEffect(() => {
        place && GetPlacePhoto();
      }, [place])
      
      const GetPlacePhoto = async ()=>{
        const data = {
          query: place?.placeName
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
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place.placeName}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={photoUrl?photoUrl : "/placeholder.png"}
          className="w-[130px] h-[130px] rounded-xl object-cover"
        
        />
        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-400">{place.placeDetails}</p>
          <h2 className="mt-2">💰{place.ticketPricing}</h2>
        </div>
      </div>
    </Link>
  );
}
