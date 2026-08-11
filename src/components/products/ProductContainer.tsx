import React from "react";
import ProductCard from "./productCard";
import { ProductType } from "@/utils/types/product";

interface ProductsGridProps {
  products: ProductType[];
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
  if (!products || products.length === 0) {
    return (
      <div className="w-full py-12 flex justify-center items-center text-gray-400">
        No products found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;