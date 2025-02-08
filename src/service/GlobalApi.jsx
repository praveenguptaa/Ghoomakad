import axios from "axios"

const BASE_URL = `https://maps.gomaps.pro/maps/api/place/textsearch/json?&key=AlzaSyagZVUzZPVyllWU4aG6ldHu02RfFy_87HX`

export const GetPlaceDetails = (data) => axios.get(BASE_URL,{
    params: data
});

export const PHOTO_REF_URL = `https://maps.gomaps.pro/maps/api/place/photo?photo_reference=name&maxwidth=600&key=`+import.meta.env.VITE_GOPRO_API_KEY