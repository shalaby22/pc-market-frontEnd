import React from "react";
import ProductsGrid from "../products/ProductContainer";

const RecentlyReleased = () => {
  return (
    <>
      <h2 className="text-4xl font-bold m-7">Recently Released</h2>

      <ProductsGrid/>
    </>
  );
};

export default RecentlyReleased;
