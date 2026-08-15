import { notFound } from "next/navigation";

import EditProductForm from "@/components/admin/EditProductForm";
import { getProductByIdAction } from "@/app/products/getProductsAction";
import { getCategoriesAction } from "@/utils/actions/categories/getCategoriesAction";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const [product, categoriesData] = await Promise.all([
    getProductByIdAction(id),
    getCategoriesAction(),
  ]);

  if (!product) {
    notFound();
  }

  const categories = categoriesData.categories || [];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Edit Product</h1>
        <p className="text-gray-400 text-sm">
          Update product:{" "}
          <span className="text-white font-semibold">{product.name}</span>
        </p>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <EditProductForm product={product} categories={categories} />
      </div>
    </div>
  );
}
