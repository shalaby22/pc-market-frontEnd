"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import image1 from "../../../public/1.webp";
import image2 from "../../../public/2.webp";
import image3 from "../../../public/3.webp";

const images = [
  { src: image1, alt: "PC Parts Banner 1" },
  { src: image2, alt: "PC Parts Banner 2" },
  { src: image3, alt: "PC Parts Banner 3" },
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="px-4 py-6 md:px-8">
      <div
        className="relative h-[40lvw] md:h-[40lvw] overflow-hidden rounded-xl group"
      >
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="100vw"
              style={{
                objectFit: "contain",
                objectPosition: "center",
              }}
              priority={index === 0}
            />
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-4 z-20 hidden group-hover:flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all focus:outline-none"
          aria-label="Previous Slide"
        >
          <svg
            className="w-5 h-5 rtl:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-4 z-20 hidden group-hover:flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all focus:outline-none"
          aria-label="Next Slide"
        >
          <svg
            className="w-5 h-5 rtl:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

      </div>
    </div>
  );
}
