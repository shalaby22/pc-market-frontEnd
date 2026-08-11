import { notFound } from "next/navigation";
import { getProductByIdAction } from "../getProductsAction";
import AddToCartSection from "@/components/products/product/AddToCartSection";
import Link from "next/link";
import ProductImagesGallery from "@/components/products/product/ProductImagesGallery";
import YouMayAlsoLike from "@/components/products/product/YouMayAlsoLike";

export default async function ProductDetailsPage({
  params,
}: {
  params: { productId: string };
}) {
  params = await params;

  const product = await getProductByIdAction(params.productId);

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="container mx-auto px-4 py-12 lg:mt-2 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/3 shrink-0">
            <ProductImagesGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          <div className="w-full md:w-2/3 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <Link
                href={`/products?category=${product.category?._id}`}
                className="text-sm font-bold text-red-500 uppercase tracking-wider bg-red-500/10 px-3 py-1 rounded-full"
              >
                {product.category?.name || "Uncategorized"}
              </Link>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-6 border-b border-neutral-700 pb-8">
              <span className="text-4xl font-black text-white">
                {product.price.toLocaleString("en-US")} EGP
              </span>
              <div className="flex flex-col lg:flex-row gap-2 lg:items-end">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}
                  ></span>
                  <span
                    className={`font-semibold ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <span className="text-sm text-gray-400">
                  Only{" "}
                  <span className="text-red-500 font-bold">
                    {product.stock}
                  </span>{" "}
                  items left
                </span>
              </div>
            </div>

            <AddToCartSection product={product} />

            <div className="mt-2 rounded-2xl p-6 lg:p-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Product Description
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <YouMayAlsoLike categoryId={product.category?._id} />
    </>
  );
}
