import React from "react";
import { getProductsAction } from "@/utils/actions/products/getProductsAction";
import ProductsGrid from "../ProductContainer";

const YouMayAlsoLike = async (props: { categoryId: string }) => {
  const products = await getProductsAction(
    `category=${props.categoryId}&countAPage=4`,
  );
  return (
    <>
      <h2 className="text-4xl font-bold m-7"> You may also like </h2>

      <ProductsGrid products={products.products} />
    </>
  );
};

export default YouMayAlsoLike;
