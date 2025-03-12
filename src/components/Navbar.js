'use client'
import React from 'react'
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
function Navbar() {
    const { data: session, status } = useSession();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

  

     

  return (
    <div className='flex justify-center'>
           <header className="bg-white w-3/4  shadow text-black p-4 flex justify-end items-center">
          
          <div className="flex items-center space-x-4">
            
            <div className="flex items-center">
              <span className="mr-2"></span>
              {session?<button  onClick={() => signOut()}
  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Signout</button>:<><button className='p-3 bg-blue-400 rounded-sm' onClick={()=>redirect('/login')}>User Login</button> <button onClick={()=>redirect('/admin/login')} className='p-3 ml-4 bg-blue-800 text-white rounded-sm' >Admin login</button></>}
            </div>
          </div>
        </header>
    </div>
  )
}

export default Navbar
