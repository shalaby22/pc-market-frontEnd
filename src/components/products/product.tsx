import React from "react";
import Image from "next/image";
import cpuImage from "../../../public/unnamed.png";

const Product = () => {
  return (
    <div className="border border-amber-700 w-full flex flex-col p-3 rounded-lg  transition-shadow hover:shadow-lg">
      <a
        href="#"
        className="relative w-full aspect-square flex items-center justify-center p-0 lg:p-2 rounded-md pb-3"
      >
        <Image
          src={cpuImage}
          alt="CPU"
          className="w-full h-full object-contain"
        />
      </a>
      <a href="#" className="grow p-2.5">
        <h5 className="text-sm md:text-base font-bold pb-2 text-gray-200">
          A4Tech FH200i Conference Business Headset with Noise Cancelling Mic
          for Crystal Clear Communicatioasg sagas gsaasg asgg asgas s
        </h5>
      </a>
      <hr className="border-gray-700 mt-2" />

      <a href="#" className="text-lg md:text-xl font-bold p-4 text-white">
        16,499 EGP
      </a>
      <button
        type="button"
        className="mt-auto text-white cursor-pointer bg-danger box-border border border-transparent hover:bg-danger-strong shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 w-full transition-colors"
      >
        <span className="text-base font-bold">Add to cart</span>
      </button>
    </div>
  );
};

export default Product;
