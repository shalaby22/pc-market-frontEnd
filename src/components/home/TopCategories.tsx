import React from "react";
import Image from "next/image";
import { getCategoriesAction } from "../../utils/actions/categories/getCategoriesAction";
import Link from "next/link";

const TopCategories = async () => {
  const { categories } = await getCategoriesAction();
  return (
    <>
      <h2 className="text-4xl font-bold m-7">TOP CATEGORIES</h2>
      <div className="flex flex-wrap items-start justify-center">
        {categories.map(
          (category: { image: string; _id: string; name: string }) => {
            return (
              <Link
                key={category._id}
                href={`/products?category=${category._id}`}
                className="group  w-1/3 md:w-1/5 m-4 block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 hover:border-gray-400"
              >
                <div className="relative overflow-hidden w-full aspect-square p-6 pb-0 flex items-center justify-center">
                  <Image
                    alt="CPU"
                    src={category.image}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="bg-white w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div>
                  <p className="font-bold text-xl w-full text-center py-4 text-white uppercase tracking-widest transition-colors duration-300 group-hover:text-red-600">
                    {category.name}
                  </p>
                </div>
              </Link>
            );
          },
        )}
      </div>
    </>
  );
};

export default TopCategories;