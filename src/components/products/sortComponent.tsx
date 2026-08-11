"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface SortComponentProps {
  onClose?: () => void; 
}

const SortComponent = ({ onClose }: SortComponentProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sort") || "newest";

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newSort === "newest") params.delete("sort");
    else params.set("sort", newSort);
    
    params.delete("page");
    router.push(`?${params.toString()}`);


    if (onClose) onClose();
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
      <label
        htmlFor="sort"
        className="text-xs lg:text-sm font-bold text-gray-300 uppercase tracking-wider sm:normal-case sm:tracking-normal sm:font-medium sm:text-gray-400 whitespace-nowrap"
      >
        Sort by:
      </label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => handleSortChange(e.target.value)}
        className="w-full appearance-none bg-none sm:w-auto bg-neutral-800 text-white text-sm rounded-lg p-2.5 border border-neutral-600 focus:outline-none focus:ring-1 focus:ring-red-500 cursor-pointer"
      >
        <option value="newest">Newest Arrival</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortComponent;