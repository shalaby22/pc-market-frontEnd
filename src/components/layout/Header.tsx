"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import Capture from "../../../public/Capture.png";
import { useAuth } from "@/utils/context/AuthContext";
import { CategoryType } from "@/utils/types/categories";
import { useRouter } from "next/navigation";
import { useCart } from "@/utils/context/CartContext";

interface HeaderProps {
  categories: CategoryType[];
}
const Header = ({ categories }: HeaderProps) => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const { cartCount } = useCart();
  function closeAllMenus() {
    setIsAccountMenuOpen(false);
    setIsCategoriesOpen(false);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeAllMenus();
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
          onClick={() => closeAllMenus()}
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
          } w-full lg:block lg:w-auto absolute lg:relative top-full left-0 lg:top-auto bg-[#2c2f33] lg:bg-transparent shadow-xl lg:shadow-none 
          max-h-[85vh] overflow-y-auto overscroll-contain lg:max-h-none lg:overflow-visible`}
          id="navbar-multi-level-dropdown"
        >
          <ul className="flex flex-col lg:mb-0 font-medium p-4 lg:p-0 border border-default rounded-base lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0">
            <li className="flex hover:bg-red-600 align-middle text-2xl font-bold mr-0 ">
              <Link
                href="/"
                onClick={() => closeAllMenus()}
                className="block p-5 h-full w-full m-auto text-white text-center rounded lg:bg-transparent lg:p-5"
              >
                HOME
              </Link>
            </li>

            <li className="relative flex flex-col lg:flex-row align-middle text-2xl font-bold mr-0 group">
              <button
                onClick={() => {
                  closeAllMenus();
                  setIsMobileMenuOpen(isMobileMenuOpen);
                  setIsCategoriesOpen(!isCategoriesOpen);
                }}
                className="block p-5 h-full w-full m-auto text-white text-center lg:bg-transparent lg:p-5 hover:bg-red-600 transition-colors duration-200"
              >
                <div className="flex items-center justify-center">
                  <span>CATEGORIES</span>
                  <svg
                    className={`w-4 h-4 ms-1.5 transition-transform duration-300 ${
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
                <div className="lg:absolute lg:top-full lg:left-0 z-50 bg-[#2c2f33] border border-neutral-700 shadow-2xl w-full lg:w-125 mt-1 lg:mt-4 rounded-xl overflow-hidden">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-4 text-sm text-gray-200 font-medium">
                    {categories.map((category) => (
                      <li key={category._id}>
                        <Link
                          href={`/products?category=${category._id}`}
                          onClick={() => closeAllMenus()}
                          className="flex items-center p-3 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 group/link"
                        >
                          <div className=" bg-white  p-2 rounded-md transition-colors shrink-0">
                            <Image
                              src={category.image}
                              alt={category.name}
                              height={40}
                              width={40}
                              className="object-contain"
                            />
                          </div>
                          <span className="ml-4 text-base font-bold capitalize">
                            {category.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            <li className="flex hover:bg-red-600 align-middle text-2xl font-bold mr-0 ">
              <Link
                href="/about-us"
                onClick={() => closeAllMenus()}
                className="block p-5 h-full w-full m-auto text-white text-center rounded lg:bg-transparent lg:p-5"
              >
                ABOUT US
              </Link>
            </li>
            <li className="hover:bg-red-600 flex align-middle text-2xl font-bold mr-0 ">
              <Link
                href="contact-us"
                onClick={() => closeAllMenus()}
                className="block p-5 h-full w-full m-auto text-white text-center rounded lg:bg-transparent lg:p-5"
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-row items-center gap-4">
          <button
            onClick={() => {
              closeAllMenus();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-base lg:hidden hover:bg-neutral-secondary-soft focus:outline-none focus:ring-2 cursor-pointer"
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
              onClick={() => {
                closeAllMenus();
                setIsAccountMenuOpen(!isAccountMenuOpen);
              }}
              className="focus:outline-none flex items-center justify-center cursor-pointer"
            >
              <svg
                className="w-10 h-10 text-white hover:text-red-500 transition-colors"
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
              <div className="absolute right-0 mt-3 w-50 bg-[#2c2f33] border rounded shadow-xl z-50">
                <ul className="py-2 text-sm text-gray-200">
                  {isAuthenticated ? (
                    <>
                      <li className="px-4 py-2 border-b border-gray-600">
                        Hello {user?.firstName}
                      </li>
                      <li>
                        <Link
                          onClick={() => closeAllMenus()}
                          href={"/account"}
                          className="block w-full text-left px-4 py-3 hover:bg-red-600"
                        >
                          my profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            logout();
                            closeAllMenus();
                          }}
                          className="block w-full text-left px-4 py-3 hover:bg-red-600 cursor-pointer"
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          onClick={() => closeAllMenus()}
                          href="/login"
                          className="block px-4 py-3 hover:bg-red-600"
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={() => closeAllMenus()}
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

          <div className="relative flex items-center">
            <button
              onClick={() => {
                closeAllMenus();
                setIsSearchOpen(!isSearchOpen);
              }}
              className="focus:outline-none flex items-center justify-center cursor-pointer"
            >
              <svg
                className="w-8 h-8 text-white hover:text-red-500 transition-colors"
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
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>

            {isSearchOpen && (
              <div className="absolute top-full right-0 mt-4 w-72 bg-[#2c2f33] border border-neutral-700 rounded-xl shadow-2xl z-50 p-3">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full bg-neutral-800 text-white text-sm rounded-lg pl-3 pr-10 py-2.5 border border-neutral-600 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />

                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            )}
          </div>

          <Link href="/cart" className="relative flex items-center">
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
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-red-500 text-black text-center text-sm font-bold w-5 h-5 
              flex items-center justify-center rounded-full border-2 border-[#2c2f33] shadow-md"
              >
                <span>{cartCount > 99 ? "99+" : cartCount}</span>
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
