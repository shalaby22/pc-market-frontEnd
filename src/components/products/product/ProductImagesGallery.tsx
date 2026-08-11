"use client";

import React, { useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface ProductImagesGalleryProps {
  images: string[];
  productName: string;
}

const ProductImagesGallery = ({
  images,
  productName,
}: ProductImagesGalleryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const slides = images.map((img) => ({ src: img }));

  return (
    <div className="bg-[#2c2f33] min-h-80 border border-neutral-700 rounded-2xl p-6 flex flex-col items-center justify-center sticky top-28">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        className="w-70 md:w-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="cursor-pointer flex justify-center items-center group"
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
            >
              <Image
                src={img}
                alt={`${productName} - Image ${index + 1}`}
                width={400}
                height={400}
                className="object-contain w-full h-auto max-h-100 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={photoIndex}
        slides={slides}
        plugins={[Zoom]}
        carousel={{ finite: true }} 
      />
    </div>
  );
};

export default ProductImagesGallery;
