"use client"
import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import axios from "axios";

export default function SignUp () {
   const [usData,setUsData] = useState({
    name: '',
    email: '',
    password: '',
   });
  
    const handleChange = (event:any) => {
      const { name, value } = event.target;
      setUsData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
      console.log(usData);
    };
  
    const handleSubmit = async (event:any) => {
      event.preventDefault();
  
      try {
        // Make a POST request to your signup API endpoint
        const response = await axios.post('/api/users/signup', usData);
        console.log(response.data);
        // Clear the form data
        setUsData({
          name: '',
          email: '',
          password: '',
        });
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <div>
      <h1 className="text-center">SignUp</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Username" className="text-black" value={usData.name}
           onChange={handleChange}/>
          <input type="email" name="email" placeholder="Email" className="text-black" value={usData.email}
        onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" className="text-black" value={usData.password}
        onChange={handleChange}/>
          <input type="submit" value="Signup" />
      </form>
  </div>
  )
}
