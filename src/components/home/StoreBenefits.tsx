import React from "react";

const StoreBenefits = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center flex-wrap ">
      <div className="flex flex-row items-center justify-center w-4/5 md:w-1/5 md:ml-10 p-2">
        <svg
          className="w-15 h-15 md:h-25 md:w-50 xl:h-25 xl:w-25 text-red-600 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
            d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <div className="ml-4">
          <span className="font-bold text-xl">EXPERT TECHNICAL SUPPORT</span>
          <p>
            We&apos;re here to assist you — reach out anytime, and we&apos;ll
            get back to you promptly!
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center w-4/5 md:w-1/5 md:border-l md:border-gray-400 md:ml-10 p-2">
        <svg
          className="w-15 h-15 md:h-25 md:w-50 xl:h-25 xl:w-25 text-red-600 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
            d="M3 10h18M6 14h2m3 0h5M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z"
          />
        </svg>
        <div className="ml-4">
          <span className="font-bold text-xl">FAST SHIPPING</span>
          <p>
            Experience the convenience of Fast Shipping – delivered straight to
            your door!
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center w-4/5 md:w-1/5 md:border-l md:border-gray-400 md:ml-10 p-2">
        <svg
          className="w-15 h-15 md:h-25 md:w-50 xl:h-25 xl:w-25 text-red-600 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
            d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
          />
        </svg>
        <div className="ml-4">
          <span className="font-bold text-xl">FLEXIBLE PAYMENT OPTIONS</span>
          <p>
            Pay your way — Instapay, Vodafone Cash, Online Payment, or Cash on
            Delivery!
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreBenefits;
