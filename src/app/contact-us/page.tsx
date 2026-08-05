import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#1e2124] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex items-center justify-center flex-col text-center space-y-8">
        
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">
            GET IN <span className="text-red-600">TOUCH</span>
          </h2>
          <h3 className="text-base md:text-lg text-gray-400 font-medium max-w-xl">
            Choose your preferred way to contact us. We&apos;re here to help!
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-6">
          
          <div className="bg-[#2c2f33] p-6 rounded-2xl border border-neutral-800 shadow-xl flex flex-col items-center space-y-3 hover:border-red-600/50 transition-colors duration-200">
            <div className="w-12 h-12 bg-red-600/10 text-red-500 rounded-full flex items-center justify-center text-xl">
              📍
            </div>
            <h4 className="text-lg font-bold text-white">Our Location</h4>
            <p className="text-gray-400 text-sm">
              123 Tech Street, Cairo, Egypt
            </p>
          </div>

          <div className="bg-[#2c2f33] p-6 rounded-2xl border border-neutral-800 shadow-xl flex flex-col items-center space-y-3 hover:border-red-600/50 transition-colors duration-200">
            <div className="w-12 h-12 bg-red-600/10 text-red-500 rounded-full flex items-center justify-center text-xl">
              📞
            </div>
            <h4 className="text-lg font-bold text-white">Phone Number</h4>
            <p className="text-gray-400 text-sm" dir="ltr">
              +20 101 234 5678
            </p>
          </div>

          <div className="bg-[#2c2f33] p-6 rounded-2xl border border-neutral-800 shadow-xl flex flex-col items-center space-y-3 hover:border-red-600/50 transition-colors duration-200">
            <div className="w-12 h-12 bg-red-600/10 text-red-500 rounded-full flex items-center justify-center text-xl">
              ✉️
            </div>
            <h4 className="text-lg font-bold text-white">Email Address</h4>
            <p className="text-gray-400 text-sm">
              support@pcmarket.com
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactPage;