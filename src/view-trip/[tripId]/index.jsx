import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

export default function ViewTrip() {
    const {tripId} = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(() => {
      tripId && getTripData()
    }, [tripId])
    

    const getTripData = async () => {
        const docRef = doc(db,'Trips',tripId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            console.log('Document:',docSnap.data());
            setTrip(docSnap.data());
        }
        else {
            console.log('No Such Document');
            toast('No Trip Found!')
            
        }
    }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* information section  */}
        <InfoSection trip={trip}/>
      {/* Recommneded hotels */}
        <Hotels trip={trip}/>
      {/* daily plans */}
        <PlacesToVisit trip={trip}/>
      {/* footer  */}
      <Footer/>
    </div>
  )
}
