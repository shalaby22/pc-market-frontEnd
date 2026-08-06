import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-full flex flex-col pt-16 items-center justify-center px-4 text-center">
      <div>
        
        <h1 className="text-9xl font-extrabold text-red-500 tracking-widest">
          404
        </h1>

        <div className="space-y-2 mt-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-gray-400">PAGE NOT FOUND</span>
          </h2>
          <p className="text-gray-400 max-w-md md:text-lg">
            Looks like this page is missing from our inventory.<br/>
            Let&apos;s get you back to Home!
          </p>
        </div>
        <div className="pt-8">
          <Link
            href="/"
            className="items-center justify-center bg-red-600 hover:bg-red-700 font-bold py-3 px-8 rounded-lg "
          >
            Return to Home
          </Link>
        </div>

      </div>
    </div>
  );
}