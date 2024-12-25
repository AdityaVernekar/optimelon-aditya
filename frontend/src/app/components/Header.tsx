import React from 'react'

import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface HeaderProps {
  session: Session | null;
  signOut: typeof signOut;
}

const Header: React.FC<HeaderProps> = ({ session, signOut }) => {
    console.log(session)
  return (
    <header className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-bold">Marketing Script Generator</h2>
    <div className="flex items-center space-x-4">
      {session?.user?.image && (
        <img
          src={session.user.image}
          alt="User Profile"
          className="w-10 h-10 rounded-full"
        />
      )}
      <div>
        <p className="text-gray-700 font-medium">{session?.user?.name}</p>
        <p className="text-gray-500 text-sm">{session?.user?.email}</p>
      </div>
      <button
        onClick={() => signOut()}
        className="bg-red-600 text-white font-medium py-1 px-3 rounded-md hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    </div>
  </header>
  )
}

export default Header