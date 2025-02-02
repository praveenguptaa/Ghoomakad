import React, { useState, useEffect } from "react";
import AddressAutocomplete from "@/components/helper/AddressAutocomplete ";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions } from "@/constants/options";
import { SelectTravelsList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function CreateTrip() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const handlePlaceSelected = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    // setSelectedPlace(place);
    // console.log('Selected place:', place);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (res) => getUserProfile(res),
    onError: (err) => console.log(err),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData.noOfDays ||
      !formData.location ||
      !formData.budget ||
      !formData.traveller
    ) {
      toast("Please fill all details.");
      return;
    }
    if (formData.noOfDays > 5 || formData.noOfDays < 1) {
      toast("Please enter valid days");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData.location.description
    )
      .replace("{totalDays}", formData.noOfDays)
      .replace("{traveller}", formData.traveller)
      .replace("{budget}", formData.budget)
      .replace("{totalDays}", formData.noOfDays);

    // console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    setLoading(false);
    saveTrip(result.response.text());
  };

  const saveTrip = async (tripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "Trips", docId), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user.email,
      id: docId,
    });
    setLoading(false);
  };

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 flex flex-col ">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customised itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <AddressAutocomplete onPlaceSelected={handlePlaceSelected} />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip
          </h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            onChange={(e) => handlePlaceSelected("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handlePlaceSelected("budget", item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
              ${formData.budget == item.title && "shadow-lg border-black"}
            `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handlePlaceSelected("traveller", item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
              ${formData.traveller == item.people && "shadow-lg border-black"}
             `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 flex justify-end">
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="" srcset="" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securly</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center justify-center"
              >
                <FcGoogle className="w-7 h-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
