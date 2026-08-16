import Link from "next/link";
import Pagination from "@/components/products/productPagination";
import { getProductsAction } from "@/utils/actions/products/getProductsAction";
import { getCategoriesAction } from "@/utils/actions/categories/getCategoriesAction";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import Image from "next/image";
import { ProductType } from "@/utils/types/product";
import { CategoryType } from "@/utils/types/categories";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string };
}) {
  searchParams = await searchParams;
  const page = searchParams.page || "1";
  const selectedCategory = searchParams.category || "";

  let queryString = `page=${page}&limit=10`;
  if (selectedCategory) {
    queryString += `&category=${selectedCategory}`;
  }

  const [productsData, categoriesData] = await Promise.all([
    getProductsAction(queryString),
    getCategoriesAction(),
  ]);

  const products = productsData.products || [];
  const pagination = productsData.pagination;

  const categories = categoriesData.categories;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Products Management
          </h1>
          <p className="text-gray-400 text-sm">
            Manage your store inventory, prices, and details.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 w-full sm:w-fit"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Product
        </Link>
      </div>

      <div className="mb-6 bg-neutral-900 border border-neutral-800 rounded-xl p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
          {categories.map((cat: CategoryType) => {
            const isActive = selectedCategory === cat._id;

            return (
              <Link
                key={cat._id}
                href={`/admin/products?category=${cat._id}&page=1`}
                className={`flex items-center justify-center px-2 py-2 rounded-lg text-xs md:text-sm font-semibold transition-colors w-full text-center ${
                  isActive
                    ? "bg-red-600 text-white"
                    : "bg-neutral-800 text-gray-400 hover:bg-neutral-700 hover:text-white"
                }`}
                title={cat.name}
              >
                <span className="truncate">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden mb-6 w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-neutral-800/50 text-gray-300 border-b border-neutral-800 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 md:px-6 md:py-4 min-w-62.5 md:min-w-62.5">
                  Product
                </th>

                <th className="hidden lg:table-cell px-4 py-3 md:px-6 md:py-4">
                  Category
                </th>

                <th className="hidden md:table-cell px-4 py-3 md:px-6 md:py-4">
                  Price
                </th>

                <th className="px-4 py-3 md:px-6 md:py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product: ProductType) => (
                  <tr
                    key={product._id}
                    className="hover:bg-neutral-800/30 transition-colors"
                  >
                    <td className="px-4 py-3 md:px-6 md:py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-neutral-800 rounded-lg overflow-hidden shrink-0 border border-neutral-700">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="font-medium text-white line-clamp-2 max-w-37.5 md:max-w-62.5 text-xs md:text-sm">
                          {product.name}
                        </div>
                      </div>
                    </td>

                    <td className="hidden lg:table-cell px-4 py-3 md:px-6 md:py-4 capitalize">
                      {product.category.name}
                    </td>

                    <td className="hidden md:table-cell px-4 py-3 md:px-6 md:py-4 font-bold text-white text-xs md:text-sm whitespace-nowrap">
                      {product.price.toLocaleString("en-US")} EGP
                    </td>

                    <td className="px-4 py-3 md:px-6 md:py-4">
                      <div className="flex items-center justify-center gap-2 md:gap-3">
                        <Link
                          href={`/admin/products/${product._id}`}
                          className="text-blue-500 hover:text-blue-400 bg-blue-500/10 p-1.5 md:p-2 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg
                            className="w-4 h-4 md:w-5 md:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </Link>

                        <DeleteProductButton id={product._id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && pagination.pages > 1 && (
        <Pagination pagination={pagination} />
      )}
    </div>
  );
}
