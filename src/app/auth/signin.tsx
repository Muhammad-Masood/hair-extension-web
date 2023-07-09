"use client"
import { NextPage } from "next";
import { FormEventHandler, useState } from "react";
import { signIn } from 'next-auth/react';

interface Props {}

export const SignIn:NextPage = (props):JSX.Element => {

  const [userInfo,setUserInfo] = useState({email:"",password:""});
  const handleSubmit:FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    })
    console.log(res);
  }
  
    return (
      <div className="flex flex-col">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input value={userInfo.email} className= "text-black" type="email" placeholder="Enter email"
          onChange={({target})=>{
            setUserInfo({...userInfo,email:target.value});
          }}/>
          <input value={userInfo.password} className= "text-black" type="password" placeholder="Enter password"
           onChange={({target})=>{
            setUserInfo({...userInfo,password:target.value});
          }}/>
          <input className="" type="submit" value="Login"/>
        </form>
      </div>
    )
  }
  