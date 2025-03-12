import React from 'react'
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
function Navbar() {
      const { data: session, status } = useSession();
  
  return (
    <div className='flex justify-center'>
           <header className="bg-white w-3/4  shadow text-black p-4 flex justify-end items-center">
          
          <div className="flex items-center space-x-4">
            
            <div className="flex items-center">
              <span className="mr-2">Admin</span>
               {session?<button  onClick={() => signOut()}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Signout</button>:<><button onClick={()=>redirect('/login')}>User Login</button> <button>user login</button></>}
            </div>
          </div>
        </header>
    </div>
  )
}

export default Navbar
