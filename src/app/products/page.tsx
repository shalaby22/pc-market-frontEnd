import ProductFiltersSidebar from "@/components/products/ProductFiltersSidebar";
import { getProductsAction } from "../../utils/actions/products/getProductsAction";
import ProductTopBar from "@/components/products/ProductTopBar";
import ProductsGrid from "@/components/products/ProductContainer";
import { getCategoriesAction } from "@/utils/actions/categories/getCategoriesAction";
import Pagination from "@/components/products/productPagination";
import { ProductType } from "@/utils/types/product";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const queryParams = new URLSearchParams();
  searchParams = await searchParams;
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value);
    }
  });

  const query = queryParams.toString();

  const { success, products, pagination } = await getProductsAction(query);

  const { categories: categoriesList } = await getCategoriesAction();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col lg:flex-row lg:gap-8">
        <div className="w-full lg:w-1/4 shrink-0">
          <ProductFiltersSidebar categories={categoriesList} />
        </div>

        <div className="flex-1 w-full flex flex-col space-y-6">
          <ProductTopBar totalProducts={pagination?.total || 0} />

          {success ? (
            <>
              <ProductsGrid products={products as ProductType[]} />

              {pagination && <Pagination pagination={pagination} />}
            </>
          ) : (
            <div className="flex items-center justify-center h-64 text-red-500 bg-[#2c2f33] rounded-2xl border border-neutral-700">
              Failed to load products. Please try again later.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
