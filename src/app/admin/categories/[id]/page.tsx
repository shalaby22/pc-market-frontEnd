import { notFound } from "next/navigation";
import CategoryForm from "@/components/admin/CategoryForm";
import { getCategoryByIdAction } from "@/utils/actions/categories/getCategoryByIdAction";

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const category = await getCategoryByIdAction(id);

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Edit Category</h1>
        <p className="text-gray-400 text-sm">
          Update details for:{" "}
          <span className="text-white font-semibold">
            {category.category?.name}
          </span>
        </p>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <CategoryForm initialData={category.category} />
      </div>
    </div>
  );
}
