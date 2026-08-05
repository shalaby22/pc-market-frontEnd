import React from "react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
            ABOUT <span className="text-red-600">US</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your ultimate destination for high-performance PC hardware, custom setups, and gaming gear.
          </p>
        </div>

        <div className="bg-[#2c2f33] p-8 rounded-2xl shadow-xl border border-neutral-800 space-y-4">
          <h2 className="text-2xl font-bold border-b border-neutral-700 pb-3">
            WHO WE ARE
          </h2>
          <p className="text-gray-300 ">
            We are passionate gamers and tech enthusiasts dedicated to bringing you the best PC components on the market. From powerful Processors and Graphics Cards to high-speed RAM and Motherboards, we help you build your dream setup with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#2c2f33] p-6 rounded-xl border border-neutral-800 text-center space-y-3">
            <div className="w-12 h-12 bg-red-600/10 text-red-500 rounded-lg flex items-center justify-center mx-auto text-2xl font-bold">
              ⚡
            </div>
            <h3 className="text-xl font-bold">Authentic Hardware</h3>
            <p className="text-gray-400 text-sm">
              100% genuine components sourced directly from official brand partners.
            </p>
          </div>

          <div className="bg-[#2c2f33] p-6 rounded-xl border border-neutral-800 text-center space-y-3">
            <div className="w-12 h-12 bg-red-600/10 text-red-500 rounded-lg flex items-center justify-center mx-auto text-2xl font-bold">
              🚀
            </div>
            <h3 className="text-xl font-bold">Fast Delivery</h3>
            <p className="text-gray-400 text-sm">
              Quick and safe shipping right to your doorstep so you can build without delay.
            </p>
          </div>

          <div className="bg-[#2c2f33] p-6 rounded-xl border border-neutral-800 text-center space-y-3">
            <div className="w-12 h-12 bg-red-600/10 text-red-500 rounded-lg flex items-center justify-center mx-auto text-2xl font-bold">
              🛠️
            </div>
            <h3 className="text-xl font-bold ">Expert Support</h3>
            <p className="text-gray-400 text-sm">
              Need help choosing compatible parts? Our team is always ready to guide you.
            </p>
          </div>
        </div>

        <div className="text-center pt-6">
          <Link
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg"
          >
            Explore Products
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;