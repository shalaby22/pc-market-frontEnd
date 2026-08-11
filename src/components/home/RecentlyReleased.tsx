import React from "react";
import ProductsGrid from "../products/ProductContainer";
import { getProductsAction } from "@/app/products/getProductsAction";

const RecentlyReleased = async () => {
  const products = await getProductsAction();
  return (
    <>
      <h2 className="text-4xl font-bold m-7">Recently Released</h2>

      <ProductsGrid products={products.products} />
    </>
  );
};

export default RecentlyReleased;
