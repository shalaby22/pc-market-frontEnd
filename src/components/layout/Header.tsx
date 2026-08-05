"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import cpuImage from "../../../public/597874.png";
import Capture from "../../../public/Capture.png";
import { useAuth } from "@/app/context/AuthContext";

const Header = () => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
        setIsCategoriesOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav
      ref={navRef}
      style={{ backgroundColor: "#2c2f33" }}
      className="bg-neutral-primary fixed w-full z-20 top-0 inset-s-0"
    >
      <div className="flex flex-wrap items-center justify-around p-4 w-full relative">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src={Capture}
            alt="Picture of the author"
            width={100}
            height={100}
          />
        </Link>

        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto absolute md:relative top-full left-0 md:top-auto bg-[#2c2f33] md:bg-transparent shadow-xl md:shadow-none`}
          id="navbar-multi-level-dropdown"
        >
          <ul className="flex flex-col mb-10 md:mb-0 font-medium p-4 md:p-0 border border-default rounded-base md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li className="flex hover:bg-red-600 align-middle text-2xl font-bold mr-0 ">
              <Link
                href="/"
                className="block p-5 h-full w-full m-auto text-white text-center rounded md:bg-transparent md:p-5"
              >
                HOME
              </Link>
            </li>

            <li className="relative flex flex-col md:flex-row align-middle text-2xl font-bold mr-0">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="block p-5 h-full w-full m-auto text-white text-center rounded md:bg-transparent md:p-5 hover:bg-red-600 transition-colors duration-200"
              >
                <div className="flex items-center justify-center">
                  <span>CATEGORIES</span>
                  <svg
                    className={`w-4 h-4 ms-1.5 transition-transform duration-200 ${
                      isCategoriesOpen ? "rotate-180" : ""
                    }`}
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
                      strokeWidth="2"
                      d="m19 9-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {isCategoriesOpen && (
                <div className="md:absolute md:top-full md:left-0 z-10 bg-[#2c2f33] border border-gray-700 shadow-xl w-full md:w-64 mt-1 rounded">
                  <ul className="py-2 text-sm text-gray-200 font-medium">
                    <li className="text-2xl">
                      <Link
                        href="#"
                        onClick={() => setIsCategoriesOpen(false)}
                        className="flex items-center px-4 py-3 hover:bg-red-600 hover:text-white transition-colors duration-200"
                      >
                        <Image
                          src={cpuImage}
                          alt="cpu"
                          height={50}
                          width={50}
                        />
                        <span className="ml-4">Processors (CPU)</span>
                      </Link>
                    </li>
                    <li className="text-2xl">
                      <Link
                        href="#"
                        onClick={() => setIsCategoriesOpen(false)}
                        className="flex items-center px-4 py-3 hover:bg-red-600 hover:text-white transition-colors duration-200"
                      >
                        <Image
                          src={cpuImage}
                          alt="cpu"
                          height={50}
                          width={50}
                        />
                        <span className="ml-4">Motherboards</span>
                      </Link>
                    </li>
                    <li className="text-2xl">
                      <Link
                        href="#"
                        onClick={() => setIsCategoriesOpen(false)}
                        className="flex items-center px-4 py-3 hover:bg-red-600 hover:text-white transition-colors duration-200"
                      >
                        <Image
                          src={cpuImage}
                          alt="cpu"
                          height={50}
                          width={50}
                        />
                        <span className="ml-4">Graphic Card</span>
                      </Link>
                    </li>
                    <li className="text-2xl">
                      <Link
                        href="#"
                        onClick={() => setIsCategoriesOpen(false)}
                        className="flex items-center px-4 py-3 hover:bg-red-600 hover:text-white transition-colors duration-200"
                      >
                        <Image
                          src={cpuImage}
                          alt="cpu"
                          height={50}
                          width={50}
                        />
                        <span className="ml-4">RAM</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li className="flex hover:bg-red-600 align-middle text-2xl font-bold mr-0 ">
              <Link
                href="/about-us"
                className="block p-5 h-full w-full m-auto text-white text-center rounded md:bg-transparent md:p-5"
              >
                ABOUT US
              </Link>
            </li>
            <li className="hover:bg-red-600 flex align-middle text-2xl font-bold mr-0 ">
              <Link
                href="contact-us"
                className="block p-5 h-full w-full m-auto text-white text-center rounded md:bg-transparent md:p-5"
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-row items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-base md:hidden hover:bg-neutral-secondary-soft focus:outline-none focus:ring-2"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-10 h-10"
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
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              className="focus:outline-none flex items-center justify-center"
            >
              <svg
                className="w-10 h-10 text-white cursor-pointer hover:text-red-500 transition-colors"
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
                  strokeWidth="1"
                  d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>

            {isAccountMenuOpen && (
              <div className="absolute right-0 mt-3 w-40 bg-[#2c2f33] border rounded shadow-xl z-50">
                <ul className="py-2 text-sm text-gray-200">
                  {isAuthenticated ? (
                    <>
                      <li className="px-4 py-2 border-b border-gray-600">
                        Hello {user?.firstName} ,
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            logout(); 
                            setIsAccountMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-3 hover:bg-red-600"
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          onClick={() => setIsAccountMenuOpen(false)}
                          href="/login"
                          className="block px-4 py-3 hover:bg-red-600"
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={() => setIsAccountMenuOpen(false)}
                          href="/register"
                          className="block px-4 py-3 hover:bg-red-600"
                        >
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>

          <svg
            className="w-10 h-10 text-white cursor-pointer hover:text-red-500 transition-colors"
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
              strokeWidth="1"
              d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Header;
