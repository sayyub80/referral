"use client";

import Link from "next/link";

export default function HomePage() {
      return (
        <div>
          <h1>Welcome </h1>
           <div className="mt-8">
          <p className="text-gray-600 mb-4">
            Not registered yet? Sign up to start earning rewards!
          </p>
          <Link
            href="/user/register"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Register Now
          </Link>
          <p className="my-4 text-gray-00">Already a memeber?</p>
          <Link
            href="/user/login"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Login
          </Link>
        </div>
        </div>
       
    
  );
}