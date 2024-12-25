"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect the user after session is loaded and available
  useEffect(() => {
    if (session) {
      router.push("/"); // Redirect to home page if authenticated
    }
  }, [session, router]); // Only run the effect when session changes

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome to Optimelon Smart A/B Testing
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Please sign in to continue
        </p>
        <button
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
