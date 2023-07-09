import Image from 'next/image'
import { Navbar } from '@/components/Navbar';
// import { signIn } from '@/app/(auth)/(routes)/sign-in/page';
import { SignIn } from '@/app/auth/signin';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { json } from 'stream/consumers';
// import { main } from '../../../../providers/seed';
import axios from 'axios';
export default async function Home() {
  // const handleMain = ()=>{
  //   main().then( ()=> {
  //     console.log("User registered successfully!");
  //     }
  //     ).catch((e)=>{console.log(e)});
  // }
  // main().then( ()=> {
  //   console.log("User registered successfully!");
  //   }
  //   ).catch((e)=>{console.log(e)});
  try{

  }
  catch{

  }
  const session = await getServerSession(authOptions);
  return (
    <div>
      <div>{JSON.stringify(session)}</div>
      <Navbar/>
    {/* //  <button onClick={handleMain}>Push User</button> */}
      <SignIn/>
    </div>
  )
}
