"use client";

import LimitComponent from "./LimitComponent";
import SortComponent from "./sortComponent";

interface ProductTopBarProps {
  totalProducts: number;
}

const ProductTopBar = ({ totalProducts }: ProductTopBarProps) => {
  return (
    <div className="hidden lg:flex bg-[#2c2f33] p-4 rounded-xl border border-neutral-700 items-center justify-between gap-4 mb-6">
      
      <p className="text-gray-300 text-base font-medium">
        Showing <span className="text-white font-bold">{totalProducts}</span> Products
      </p>

      <div className="flex items-center gap-4">
        <LimitComponent />
        <SortComponent />
      </div>
    </div>
  );
};

export default ProductTopBar;