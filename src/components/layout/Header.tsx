
import Image from "next/image";
import cpuImage from "../../../public/597874.png";
import Capture from "../../../public/Capture.png";
const Header = () => {
  return (
    <nav
      style={{ backgroundColor: "#2c2f33" }}
      className="bg-neutral-primary fixed w-full z-20 top-0 inset-s-0"
    >
      <div className="flex flex-wrap items-center justify-around p-4 w-full">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src={Capture}
            alt="Picture of the author"
            width={100}
            height={100}
          />
          <span className=" self-center text-3xl text-red-600 font-semibold whitespace-nowrap ml-2">
            {" "}
          </span>
        </a>

        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-multi-level-dropdown"
        >
          <ul className="flex flex-col mb-10 md:mb-0 font-medium p-4 md:p-0 mt-4 border border-default rounded-base  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  ">
            <li className="flex  hover:bg-red-600 align-middle text-2xl font-bold mr-0 ">
              <a
                href="#"
                className=" block p-5 h-full w-full  m-auto  text-white text-center rounded md:bg-transparent md:p-5"
                aria-current="page"
              >
                HOME
              </a>
            </li>
            <li className="flex align-middle text-2xl font-bold mr-0">
              <button
                id="multiLevelDropdownButton"
                data-dropdown-toggle="multi-dropdown"
                className="block p-5 h-full w-full m-auto text-white text-center rounded md:bg-transparent md:p-5 hover:bg-red-600 transition-colors duration-200"
              >
                <div className="flex items-center justify-center">
                  <span>CATEGORIES</span>
                  <svg
                    className="w-4 h-4 ms-1.5"
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

              <div
                id="multi-dropdown"
                className="z-10 hidden bg-[#2c2f33] border border-gray-700 shadow-xl w-full md:w-1/2"
              >
                <ul
                  className="py-2 text-sm text-gray-200 font-medium"
                  aria-labelledby="multiLevelDropdownButton"
                >
                  <li className="text-2xl">
                    <a
                      href="#"
                      className=" flex items-center px-4 py-3 hover:bg-red-600 hover:text-white transition-colors duration-200 "
                    >
                      <Image
                        src={cpuImage}
                        alt="cpu"
                        height={50}
                        width={50}
                      ></Image>
                      <span className="ml-4">Processors (CPU)</span>
                    </a>
                  </li>

                  {/* <li>
                        <button
                          id="doubleDropdownButton"
                          data-dropdown-toggle="doubleDropdown"
                          data-dropdown-placement="right-start"
                          type="button"
                          className="flex items-center justify-between w-full px-4 py-3 hover:bg-red-600 hover:text-white transition-colors duration-200"
                        >
                          Graphics Cards
                          <svg
                            className="h-4 w-4 ms-auto rtl:rotate-180"
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
                              d="m9 5 7 7-7 7"
                            />
                          </svg>
                        </button>
                        <div
                          id="doubleDropdown"
                          className="z-10 hidden bg-[#2c2f33] border border-gray-700 rounded-lg shadow-xl w-48"
                        >
                          <ul
                            className="py-2 text-sm text-gray-200 font-medium"
                            aria-labelledby="doubleDropdownButton"
                          >
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-3 hover:bg-red-600 hover:text-white transition-colors duration-200 rounded-t-lg"
                              >
                                NVIDIA
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-3 hover:bg-red-600 hover:text-white transition-colors duration-200 rounded-b-lg"
                              >
                                AMD Radeon
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li> */}
                  <li className="text-2xl">
                    <a
                      href="#"
                      className=" flex items-center px-4 py-3 hover:bg-red-600 hover:text-white transition-colors duration-200 "
                    >
                      <Image
                        src={cpuImage}
                        alt="cpu"
                        height={50}
                        width={50}
                      ></Image>
                      <span className="ml-4">Motherboards</span>
                    </a>
                  </li>
                  <li className="text-2xl">
                    <a
                      href="#"
                      className=" flex items-center px-4 py-3 hover:bg-red-600 hover:text-white transition-colors duration-200 "
                    >
                      <Image
                        src={cpuImage}
                        alt="cpu"
                        height={50}
                        width={50}
                      ></Image>
                      <span className="ml-4">Graphic Card</span>
                    </a>
                  </li>
                  <li className="text-2xl">
                    <a
                      href="#"
                      className=" flex items-center px-4 py-3 hover:bg-red-600 hover:text-white transition-colors duration-200 "
                    >
                      <Image
                        src={cpuImage}
                        alt="cpu"
                        height={50}
                        width={50}
                      ></Image>
                      <span className="ml-4">RAM</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="flex  hover:bg-red-600 align-middle text-2xl font-bold mr-0 ">
              <a
                href="#"
                className=" block p-5 h-full w-full  m-auto  text-white text-center rounded md:bg-transparent md:p-5"
              >
                ABOUT US
              </a>
            </li>
            <li className="hover:bg-red-600 flex align-middle text-2xl font-bold mr-0 ">
              <a
                href="#"
                className=" block p-5 h-full w-full  m-auto  text-white text-center rounded md:bg-transparent md:p-5"
              >
                CONTACT
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-row">
          <button
            data-collapse-toggle="navbar-multi-level-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-multi-level-dropdown"
            aria-expanded="false"
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
          <svg
            className="w-10 h-10 text-white dark:text-white"
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

          <svg
            className="w-10 h-10 text-white dark:text-white"
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
