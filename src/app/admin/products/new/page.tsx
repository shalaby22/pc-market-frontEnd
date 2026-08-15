import NewProductForm from "@/components/admin/NewProductForm";
import { getCategoriesAction } from "@/utils/actions/categories/getCategoriesAction";

export default async function NewProductPage() {
  const { categories } = await getCategoriesAction();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Add New Product</h1>
        <p className="text-gray-400 text-sm">
          Fill in the details below to add a new component to your catalog.
        </p>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <NewProductForm categories={categories || []} />
      </div>
    </div>
  );
}
