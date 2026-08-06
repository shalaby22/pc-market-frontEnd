import React from "react";
import Image from "next/image";
import cpuImage from "../../../public/unnamed.png";

const TopCategories = () => {
  return (
    <>
      <h2 className="text-4xl font-bold m-7">TOP CATEGORIES</h2>
      <div className="flex flex-wrap items-center justify-center">
        <a
          href="./"
          className="group  w-1/3 md:w-1/5 m-4 block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-2 hover:border-gray-400"
        >
          <div className="relative overflow-hidden w-full aspect-square p-6 pb-0 flex items-center justify-center">
            <Image
              alt="CPU"
              src={cpuImage}
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div>
            <p className="font-bold text-xl w-full text-center py-4 text-white uppercase tracking-widest transition-colors duration-300 group-hover:text-red-600">
              CPU
            </p>
          </div>
        </a>
        <a
          href="./"
          className="group  w-1/3 md:w-1/5 m-4 block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-2 hover:border-gray-400"
        >
          <div className="relative overflow-hidden w-full aspect-square p-6 pb-0 flex items-center justify-center">
            <Image
              alt="CPU"
              src={cpuImage}
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div>
            <p className="font-bold text-xl w-full text-center py-4 text-white uppercase tracking-widest transition-colors duration-300 group-hover:text-red-600">
              CPU
            </p>
          </div>
        </a>
        <a
          href="./"
          className="group  w-1/3 md:w-1/5 m-4 block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-2 hover:border-gray-400"
        >
          <div className="relative overflow-hidden w-full aspect-square p-6 pb-0 flex items-center justify-center">
            <Image
              alt="CPU"
              src={cpuImage}
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div>
            <p className="font-bold text-xl w-full text-center py-4 text-white uppercase tracking-widest transition-colors duration-300 group-hover:text-red-600">
              CPU
            </p>
          </div>
        </a>
        <a
          href="./"
          className="group  w-1/3 md:w-1/5 m-4 block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-2 hover:border-gray-400"
        >
          <div className="relative overflow-hidden w-full aspect-square p-6 pb-0 flex items-center justify-center">
            <Image
              alt="CPU"
              src={cpuImage}
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div>
            <p className="font-bold text-xl w-full text-center py-4 text-white uppercase tracking-widest transition-colors duration-300 group-hover:text-red-600">
              CPU
            </p>
          </div>
        </a>
        <a
          href="./"
          className="group  w-1/3 md:w-1/5 m-4 block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-2 hover:border-gray-400"
        >
          <div className="relative overflow-hidden w-full aspect-square p-6 pb-0 flex items-center justify-center">
            <Image
              alt="CPU"
              src={cpuImage}
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div>
            <p className="font-bold text-xl w-full text-center py-4 text-white uppercase tracking-widest transition-colors duration-300 group-hover:text-red-600">
              CPU
            </p>
          </div>
        </a>
        <a
          href="./"
          className="group  w-1/3 md:w-1/5 m-4 block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-2 hover:border-gray-400"
        >
          <div className="relative overflow-hidden w-full aspect-square p-6 pb-0 flex items-center justify-center">
            <Image
              alt="CPU"
              src={cpuImage}
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div>
            <p className="font-bold text-xl w-full text-center py-4 text-white uppercase tracking-widest transition-colors duration-300 group-hover:text-red-600">
              CPU
            </p>
          </div>
        </a>
        <a
          href="./"
          className="group  w-1/3 md:w-1/5 m-4 block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-2 hover:border-gray-400"
        >
          <div className="relative overflow-hidden w-full aspect-square p-6 pb-0 flex items-center justify-center">
            <Image
              alt="CPU"
              src={cpuImage}
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div>
            <p className="font-bold text-xl w-full text-center py-4 text-white uppercase tracking-widest transition-colors duration-300 group-hover:text-red-600">
              CPU
            </p>
          </div>
        </a>
        <a
          href="./"
          className="group  w-1/3 md:w-1/5 m-4 block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-2 hover:border-gray-400"
        >
          <div className="relative overflow-hidden w-full aspect-square p-6 pb-0 flex items-center justify-center">
            <Image
              alt="CPU"
              src={cpuImage}
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div>
            <p className="font-bold text-xl w-full text-center py-4 text-white uppercase tracking-widest transition-colors duration-300 group-hover:text-red-600">
              CPU
            </p>
          </div>
        </a>
      </div>
    </>
  );
};

export default TopCategories;
