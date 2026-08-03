import React from "react";
import Product from "./product";

const ProductsGrid = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Product key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
