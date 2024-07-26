import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-8 text-gray-900">
      <div className="max-w-4xl w-full text-center bg-white rounded-2xl shadow-xl p-12 transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Skillfolio</h1>
        <h2 className="text-4xl font-semibold mb-8 text-gray-700">Build your professional CV</h2>
        <p className="text-xl mb-12 text-gray-600">
            Generate an impressive resume in minutes with our advanced tool
        </p>
        <Link href="/builder">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-md">
          Go to the Builder 
          </Button>
        </Link>
      </div>
      <div className="mt-16 text-center">
        <p className="text-lg text-gray-600">
            Skillfolio is a next-generation CV creation assistant,
            designed to be secure, accurate and efficient
          <br />designed to be safe, accurate and efficient.
        </p>
        <p className="mt-4 text-sm text-gray-500 font-semibold tracking-wider">BY SKILLFOLIO TEAM</p>
      </div>
    </div>
  );
};

export default Home;