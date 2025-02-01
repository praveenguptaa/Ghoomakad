import React, { useState,useEffect } from 'react'
import AddressAutocomplete from '@/components/helper/AddressAutocomplete '
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions } from '@/constants/options';
import { SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';

export default function CreateTrip() {

  const [selectedPlace, setSelectedPlace] = useState(null);

  const [formData, setFormData] = useState([]);

  const handlePlaceSelected = (name,value) => {

    setFormData({
      ...formData,
      [name]:value,
    })
    // setSelectedPlace(place);
    // console.log('Selected place:', place);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData])
  
  const onGenerateTrip = ()=> {
    if(formData.noOfDays > 5 || formData.noOfDays < 1 ){
      return;
    }
    console.log(formData);
  }

  return (
    
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 flex flex-col '>
      <h2 className='font-bold text-3xl'>
        Tell us your travel preferences
      </h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customised itinerary based on your preferences.
      </p>
      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>
            What is destination of choice?
          </h2>
          <AddressAutocomplete onPlaceSelected={handlePlaceSelected} />
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>
            How many days are you planning your trip
          </h2>
          <Input placeholder={'Ex.3'} type="number"
          onChange={(e)=>handlePlaceSelected('noOfDays',e.target.value)}
           />
        </div>
      
      <div>
        <h2 className='text-xl my-3 font-medium'>
          What is your Budget?
        </h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index} 
            onClick={()=>handlePlaceSelected('budget',item.title)}
            className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
              ${formData.budget == item.title && 'shadow-lg border-black'}
            `}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className='text-xl my-3 font-medium'>
        Who do you plan on traveling with on your next adventure?
        </h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelsList.map((item, index) => (
            <div key={index}
            onClick={()=>handlePlaceSelected('traveler',item.people)}
             className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
              ${formData.traveler == item.people && 'shadow-lg border-black'}
             `}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      </div>
      <div className='my-10 flex justify-end'>
      <Button onClick={onGenerateTrip}>Generate Trip</Button>
    </div>
    </div>
    
  
    
  )
}
