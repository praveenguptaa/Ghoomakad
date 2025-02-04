import React,{useEffect,useState}from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useNavigate } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';



export default function Header() {

  const [openDialog, setOpenDialog] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (res) => getUserProfile(res),
    onError: (err) => console.log(err),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };
  
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src='/logo.svg'/>
      <div>
        {
          user?
          <div className='flex items-center gap-3'>
            <a href="/create-trip">
            <Button variant="outline" className="rounded-full">Add Trip</Button>
            </a>
            <a href="/my-trips">
            <Button variant="outline" className="rounded-full">My Trips</Button>
            </a>
            
            <Popover>
              <PopoverTrigger className='bg-transparent p-0'>
              <img src={user.picture} className='h-[35px] w-[35px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Log Out</h2>
              </PopoverContent>
            </Popover>

          </div>
          :
          <Button onClick={()=>{setOpenDialog(true)}}>Sign In</Button>
        }
        
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="" srcset="" />
              <h2 className="font-bold text-lg mt-7 text-black">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securly</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center justify-center "
              >
                <FcGoogle className="w-7 h-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
